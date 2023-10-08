
class fn_gen:
    def __init__(self, path:str) -> None:
        self.path = path

    def make_un_newline(self,file_array:list[str]) -> list[str]:
        new_r:list[str] = []

        for i in file_array:
            new_r.append(i.strip("\n"))    
        
        return new_r

    def tag_util_maker(self) -> list[str]:
        file = open(self.path, "r")
        r:list[str] = file.readlines()  
        r = self.make_un_newline(r)
        return r

    def gen(self) -> None:
        gen_writer:list[str] = self.tag_util_maker()
        file2 = open("tags.js","a")

        for i in gen_writer:
            file2.write(
                f"""
    function {i} (props, ...childrens){{\n
        return MakeElement("{i}", props, childrens)
    }}
                """
            )

            file2.write(
                f"""
    function {i} (...childrens){{\n
        return MakeElement("{i}", undefined, childrens)
    }}
                """
            )

file = open("tags.txt","r")
file2 = open("tags.js", "a")


l = fn_gen("tags.txt")
l.gen()