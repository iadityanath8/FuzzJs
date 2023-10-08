#ifndef LIST_IMPL
#define LIST_IMPL

#include <stdlib.h>

typedef struct {
	char** list;

	size_t len;
	size_t cap;
}GEN_list;

GEN_list GEN_list_alloc(size_t size) {
	GEN_list t;
	t.list = (char**)malloc(sizeof(char*) * size);
	t.len = 0;
	t.cap = size;
	return t;
}

void GEN_list_push(GEN_list* gen, char* ele) {
	if (gen->len == gen->cap - 1) {
		char** ptr = realloc(gen->list, (gen->cap) * 2);

		GEN_ASSERT(ptr == NULL, "Cannot allocate the memory");

		gen->list = ptr;
		gen->cap = (gen->cap) * 2;
		gen->list[gen->len] = ele;
		gen->len++;
	}
	else {
		gen->list[gen->len] = ele;
		gen->len++;
	}
}


#endif