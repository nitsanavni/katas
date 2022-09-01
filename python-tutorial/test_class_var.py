class ClassWithClassVarList:
    class_var_list = []

    def __init__(self):
        pass

    def add_to_list(self, element: str):
        self.class_var_list.append(element)


def test_class_var_is_in_class_level():
    a, b = ClassWithClassVarList(), ClassWithClassVarList()
    a.add_to_list("a")
    b.add_to_list("b")

    assert a.class_var_list == b.class_var_list


class ClassWithOverridenClassVarList:
    class_var_list = []

    def __init__(self):
        self.class_var_list = []

    def add_to_list(self, element: str):
        self.class_var_list.append(element)


def test_overriden_class_var_is_in_instance_level():
    a, b = ClassWithOverridenClassVarList(), ClassWithOverridenClassVarList()
    a.add_to_list("a")
    b.add_to_list("b")

    assert a.class_var_list != b.class_var_list
