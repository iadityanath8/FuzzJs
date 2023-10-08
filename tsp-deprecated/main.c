#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

typedef char* Raw_str;
typedef void _No_return;
#define JSX_ASSERT(expr, err_type) \
	if(expr){\
		printf("ERROR: In file  %s %s at line no -> %d", \
		__FILE__,error_to_string(err_type), __LINE__);\
		exit(EXIT_FAILURE);\
	}
#define Str$(expr) String_new(expr)
#define LOG(expr) printf("%s\n", expr);
#define LOG_d(expr) printf("%d\n", expr);
#define LOG_f(expr) printf("%f\n", expr);
#define LOG_c(expr) printf("%c\n", expr);
#define _MAKE_JSX_TOKENIZER(a, _Kind_name) \
	(RDOM_jsx_tokenizer) { .kind = a,.name = _Kind_name}

#define Str_at(str_val, idx) (str_val).R_str[idx]
#define ref *
#define BUFFER_SIZE 28    // surely gonna increase it in here
/// <summary>
/// Big macro defination still an experiment API
/// </summary>

#define __SHOW_content_def_tok(__dtok)\
	printf("INFO: Token_type is %d and tokens value is %s\n", (__dtok).kind, (__dtok).name);

typedef enum {
	MEM_ALLOC_FAILED_ERROR,
	FILE_F_T_OPEN,
	FILE_C_D_M,
	SEEK_SEG_F
}JSX_ERROR;

const char* error_to_string(JSX_ERROR err) {
	switch (err)
	{
	case MEM_ALLOC_FAILED_ERROR:
		return "ALLOCATION FAILED";   // w are not using heap string for performance concern not for free reason
	case FILE_F_T_OPEN:
		return "FILE FAILED TO OPEN";
	case SEEK_SEG_F:
		return "Seeking to the file failed";
	case FILE_C_D_M:
		return "could not close the following file";
	default:
		break;
	}
}


typedef struct {
	Raw_str R_str; // mutable
	size_t len;
	size_t cap;
}String;

String String_alloc(int len) {
	Raw_str _chunck_FILE_read_memory__segment_malloced = malloc(sizeof(char) * len + 1);

	JSX_ASSERT(_chunck_FILE_read_memory__segment_malloced == NULL, MEM_ALLOC_FAILED_ERROR);
	
	return (String) {
		.R_str = _chunck_FILE_read_memory__segment_malloced,
		.len = 0,
		.cap = len
	};
}

_No_return String_cpy(String ref str_val, const char* src) {
	size_t len = strlen(src);

	Raw_str raw_str = str_val->R_str;

	for (size_t i = 0; i < len; i++) {
		raw_str[i] = src[i];
		str_val->len++;
	}
}

String String_new(const char* naked_str) {
	size_t len = strlen(naked_str);
	String heap_str = String_alloc(len + 1); // for easy interoperability of raw_str and String

	String_cpy(&heap_str, naked_str);

	return heap_str;
}

_No_return putStr(String a) {
	size_t len = a.len;

	for (size_t i = 0; i < len; i++) {
		printf("%c", a.R_str[i]);
	}
	printf("\n");
}

_No_return String_push_str(String ref a, const char* naked_str) {
	size_t ll = strlen(naked_str);
	size_t len = a->len + ll;

	if (a->cap > len) {
		size_t i = 0;
		while (i < ll) {
			a->R_str[a->len] = naked_str[i];
			i += 1;
			a->len++;
		}
		return;
	}
	else {
		a->R_str = realloc(a->R_str, sizeof(char) * len);

		JSX_ASSERT(a->R_str == NULL, MEM_ALLOC_FAILED_ERROR);
		
		size_t l = a->len;
		size_t i = 0;
		a->cap = sizeof(char) * len;

		while (i < ll) {
			a->R_str[a->len] = naked_str[i];
			i += 1;
			a->len++;
		}
	}
}

_No_return String_push_char(String ref a, char ch) {
	if (a->len >= a->cap) {
		a->R_str = realloc(a->R_str, sizeof(ch) * a->cap * 2);

		JSX_ASSERT(a->R_str == NULL, MEM_ALLOC_FAILED_ERROR);

		a->cap = sizeof(ch) * a->cap * 2;
		a->R_str[a->len] = ch;
		a->len++;
	}
	else {
		a->R_str[a->len] = ch;
		a->len++;
	}
}

bool String_Eq(String a, String b) {
	if (a.len != b.len) {
		return false;
	}

	for (size_t i = 0; i < a.len; i++) {
		if (a.R_str[i] != b.R_str[i]) {
			return false;
		}
	}
	
	return true;
}

_No_return String_drop(String a) {
	free(a.R_str);
	a.R_str = NULL;
}



typedef enum {
	// comparisons
	TOKEN_LT,   // >
	TOKEN_GT,   // <
	TOKEN_EQ,
	
	// id's
	TOKEN_ID_NAME,
	
	// String literal

	TOKEN_STRING_LIT,

	// brackets
	TOKEN_SQ_OP,
	TOKEN_SQ_CLOSE,
	TOKEN_OPEN_PAREN,
	TOKEN_CLOSE_PAREN,
} token_kind;

typedef struct {
	token_kind kind;
	char* name;
}RDOM_jsx_tokenizer;


// deprecated
typedef struct {
	RDOM_jsx_tokenizer* many;  // mutable and Array properties 
	size_t len;
	size_t cap;
}JSX_ArrayList;

// Experimental API
typedef struct {
	char* key;
	char* value;
}JSX_Object;


JSX_ArrayList Rdom_array_init(size_t alloc_size) {
	
	RDOM_jsx_tokenizer* tokens_array = malloc(sizeof(RDOM_jsx_tokenizer) * alloc_size);
	
	JSX_ASSERT(tokens_array == NULL, MEM_ALLOC_FAILED_ERROR);

		return (JSX_ArrayList) {
		.many = tokens_array,
		.len = 0,
		.cap = alloc_size
	};
}

_No_return Array_list_push(JSX_ArrayList ref list, RDOM_jsx_tokenizer token) {
	if (list->len >= list->cap) {
		list->many = realloc(list->many, sizeof(RDOM_jsx_tokenizer)*list->cap*2);
		
		list->cap = list->cap * 2;
		
		JSX_ASSERT(list->many == NULL, MEM_ALLOC_FAILED_ERROR);

		list->many[list->len] = token;
		list->len++;
	}
	else {
		list->many[list->len] = token;
		list->len++;
	}
}

_No_return Log_List_content(JSX_ArrayList ref list) {
	for (size_t i = 0; i < list->len; i++) {
		__SHOW_content_def_tok(list->many[i]);
	}
}

_No_return ArrayList_Free(JSX_ArrayList ref list) {
	free(list->many);
	list->many = NULL;
}

typedef struct {
	String src;  // maybe needed to add ref in here
	size_t idx;
}RDOM_jsx_Lexer;

size_t _len_s(FILE* fptr) {
	int t = fseek(fptr, 0L, SEEK_END);
	int size = 0;
	JSX_ASSERT(t != 0, SEEK_SEG_F);
	
	size = ftell(fptr);
	t = fseek(fptr, 0L, SEEK_SET);

	JSX_ASSERT(t != 0, SEEK_SEG_F);

	return size;
}

RDOM_jsx_Lexer JSX_init(const char* const path){
	char cdr_mem[BUFFER_SIZE] = {};
	FILE* fptr = fopen(path, "r");
	
	
	RDOM_jsx_Lexer lex = { 0 }; // bother kate about optimizations

	JSX_ASSERT(fptr == NULL, FILE_F_T_OPEN);

	int len = _len_s(fptr);
	if (len > BUFFER_SIZE) {
		while (fgets(cdr_mem, BUFFER_SIZE, fptr) != NULL) { // Buffered IO
			String_push_str(&lex.src, cdr_mem);
		}
	}
	int rt = fclose(fptr);
	
	JSX_ASSERT(rt == -1, FILE_C_D_M);

	return lex;;
}


_No_return Lex_trim_whitespaces(RDOM_jsx_Lexer ref lex) {
	while (Str_at(lex->src, lex->idx) == ' ' || Str_at(lex->src, lex->idx) == '\n') {
		//printf("trimming whitespaces\n");
		lex->idx++;
	}
}

String collect_literals(RDOM_jsx_Lexer ref lex) {    // will optimize using custom pool allocators 
	String a = String_alloc(3);
	
	while (isalnum(Str_at(lex->src, lex->idx))) {
		String_push_char(&a,Str_at(lex->src, lex->idx));
		lex->idx++;
	}

	return a;
}

_No_return Lex_drop(RDOM_jsx_Lexer le) {
	free(le.src.R_str);
	le.src.R_str = NULL;
}

/// <summary>
/// This is Now the main function in here which will make whole src to Node
/// </summary>
/// <param name="lex">RDOM_jsx_Lexer lex</param>
/// <returns>RDOM_jsx_tokenizer</returns>

_No_return Lex_expect_c(char l, char _e) {
	if (l != _e) {
		LOG("INFO: Exiting abnormally expectation failed");
		exit(EXIT_FAILURE);
	}
}

_No_return Lex_expect_s(String s, const Raw_str _t) {
	
	if (s.len != strlen(_t)) {
		LOG("INFO: Exiting abnormally expectation failed");
		exit(EXIT_FAILURE);
	}

	for (int i = 0; i < s.len; i++) {
		if (s.R_str[i] != _t[i]) {
			LOG("INFO: Exiting abnormally expectation failed");
			exit(EXIT_FAILURE);
		}
	}

}

_No_return RDOM_handle_html_element(RDOM_jsx_Lexer ref lex) {
	switch (Str_at(lex->src, lex->idx))
	{
	case '{':
		break;
	case '=':
		break;
	case '<':
		lex->idx++;
		Lex_trim_whitespaces(lex);
		int fat = 0;
		String a = String_alloc(3);
		while (Str_at(lex->src, lex->idx) != ' ' /*|| Str_at(lex->src, lex->idx) != '>'*/) {
			
			if (Str_at(lex->src, lex->idx) == '>') {
				lex->idx++;
				fat = 1;
				break;
			}

			String_push_char(&a, Str_at(lex->src, lex->idx));
			lex->idx++;
		}

		putStr(a);
		Lex_trim_whitespaces(lex);
		
		// there is a possibility of an character in here

		if (isalpha(Str_at(lex->src, lex->idx))) {
			String collect = String_alloc(3);

			if (fat == 0) {
				while (Str_at(lex->src, lex->idx) != '>') {
					String_push_char(&collect, Str_at(lex->src, lex->idx));
					lex->idx++;
					
					if (Str_at(lex->src, lex->idx) == '"' && 
						isalnum(Str_at(lex->src, lex->idx - 1)) &&
						Str_at(lex->src, lex->idx + 1) != '>')
					{

						String_push_char(&collect, Str_at(lex->src, lex->idx));
						lex->idx++;
						String_push_char(&collect, ',');
					
					}
					else if (Str_at(lex->src, lex->idx) == '}') {
						String_push_char(&collect, Str_at(lex->src, lex->idx));
						lex->idx++;
						String_push_char(&collect, ',');
					}
				}
			}
			else {
				//Lex_trim_whitespaces(lex); an important comment
				while (Str_at(lex->src, lex->idx) != '<') {
					String_push_char(&collect, Str_at(lex->src, lex->idx));
					lex->idx++;
				}
				lex->idx++;

				Lex_expect_c(Str_at(lex->src, lex->idx), '/');
				lex->idx++;
				
				String b = collect_literals(lex); // needed to be dropped
				
				b.R_str[b.len] = '\0';

				Lex_expect_s(a, b.R_str);
				Lex_expect_c(Str_at(lex->src, lex->idx), '>');

			}
			
			lex->idx++;
			Lex_trim_whitespaces(lex);

			printf("This is collect -> ");
			putStr(collect);
			
			RDOM_handle_html_element(lex);
		}

		break;
	default:
		break;
	}
}

// Memory Leak Expected
_No_return RDOM_Make_F_Gen(RDOM_jsx_Lexer ref lex){

	while (lex->idx < lex->src.len) {
		
		// Find Macro defination for JSX
		if (isalpha(Str_at(lex->src, lex->idx))) {
			String s = collect_literals(lex);       // maybe it can be a big string
			if (Str_at(lex->src, lex->idx) == '!') {
				String_push_char(&s, Str_at(lex->src, lex->idx));
				lex->idx++;
				
				Lex_expect_s(s, "JSX!");
				Lex_expect_c(Str_at(lex->src, lex->idx), '{');
				lex->idx++;

				Lex_trim_whitespaces(lex);

				RDOM_handle_html_element(lex);
				//printf("%c --> \n", lex->src.R_str[lex->idx]);
			}
		}

		lex->idx++;
	}
}

int main() {
	RDOM_jsx_Lexer l = JSX_init("h.jsx");
	RDOM_Make_F_Gen(&l);// 64 bit

	Lex_drop(l);
	
	return 0;
}
