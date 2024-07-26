# Hi
1. In the file "awefulWithComments.js" I wrote down everything I think is wrong with the initial code.
2. There is 3 folders:
    - In "common," you can find constants for code logic, utility functions, and separate constants for expected test results.
    - In "OOP" and "Functional," you can find two different refactored variants of the "aweful" code, including tests.
3. Why did I do 2 variants? 
    - I started with OOP because this situation was really easy to express with it. I thought the code would be expressive and readable. I think I achieved that, and this program will be easier to maintain and scale. But then I saw how much lines of code it has. 
    - So, I decided to write a new variant in a functional style. This variant is much shorter and also does its job, but it will be much harder to scale. For example, it is less flexible when working with ingredients.
4. Because this application is small, I didn't need to fully implement either OOP or functional style. For example, from OOP, I just used encapsulation, which I also replicated in the functional variant by using closures (see the getCoffeeMachine function in lib.js). Also, I used callbacks a lot in both variants, as it is hard to write JavaScript without them. I think most programs written in JavaScript are a combination of both paradigms.

# TASK:
You are given a javascript file which implements a coffee machine. The code is ugly and bad, and has some bugs. First write up what you think is wrong with the code. Then fix the bugs. Then refactor it: make sure to change the informal print debugging at the end of the script into actual tests first, and then improve the code to your liking, with an additional explanation about why you chose the particular way to write it (functional, OOP, what-have-you). The file is attached.