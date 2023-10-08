#include <stdio.h>



int main() {
	FILE* fptr = fopen("main.txt", "a");
	
	const char* writable = "This is me in here";

	fputs(writable, fptr);

	const char* wr = "Meow";

	fputs(wr, fptr);

	fclose(fptr);
	return 0;
}