>let text = "name:MinYi,age 18,height175"
undefined
>let re = /[0-9]+/g
undefined
>re
/[0-9]+/g
>text.match(re)
['18', '175']
>let re2 =/[a-z]+/g
undefined
>re2
/[a-z]+/g
>text.match(re2)
['name', 'in', 'i', 'age', 'height']
>let re3 = /[A-Z]+/g
undefined
>re3
/[A-Z]+/g
>text.match(re3)
['M', 'Y']
>let re4 = /[0-9a-zA-Z]+/g
undefined
>re4
/[0-9a-zA-Z]+/g
>text.match(re4)
['name', 'MinYi', 'age', '18', 'height175']
>let re5 = /\w/
undefined
>re5
/\w/
>text.match(re5)
['name:MinYi,age 18,height175']
>let re6 = /\w+/
undefined
>re6
/\w+/
>text.match(re6)
['name:MinYi,age 18,height175']
