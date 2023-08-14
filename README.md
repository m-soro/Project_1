# Pong!

## **A super fun classic! This is Pong!**

## Play on 📱

![image](image/demo-mobile.jpeg)

## Play on 💻 or 🖥️

![image](image/demo.gif)

## **Save the link or bookmark it https://m-soro.github.io/Project_1/ **

This is my first project for the Software Enegineering course at PerScholas.

**Keyboard Controls:**

- **Left Arrow Key** - move left
- **Right Arrow Key** - move right
- **Enter/Return Key** - start game
- **Spacebar** - pause game
- **r** - re-start game

**Alternatively, use your mouse to drag the paddle.**

## About the Project

**Introduction**

I am so glad the way this project turned out. My goal is to create an interactive and engaging app.
I wanted a clean, minimalist look while offering functionalities that the user may expect.
I had a lot of fun building it as well as playing it. More on the process below.

Take about design
the challenge
the UI experience

**Process**

**Preparation**
This is my first collision based game. To prepare started researching and looking at how other devs implemented a collision detection function. This took about a day.

**Execution**

I wanted to create an object oriented game, So I used classes for the ball and object separated these two from the main script, and that's how far I got into it. I found it difficult to conceptualize how all these pieces work together.

Now that the game is functioning, I could see and build a blueprint for how the object's methods can work together.

**Challenges Back End/Front End**

**1.**

- Adding and the ball velocity to the css position property of the object. I keep on forgetting that these are strings and that these needed to be converted to ints before processing them.
- What I could have done is define this properties as ints in the object's constructor class and then just concatenate the "px" after these values have been processed and ready to be assigned to css. I didn't refactor this code. I am just realizing this as I am typing this.
- There are many tutorials on how to write a collision detection function, one thing that I found it helpful to break this function down so I could fully understand what its doing.
- I had a lot of confusion with the screen's X and Y coordinates. Confusion with assigning the ball velocity to X and Y values. I wasted so much time trying to debug something simple like this.

**2.**

- After the game is functioning as expected. Its time to work on the UI this presented a set of problems as well.
- I knew I wanted a clean, minimalist look but intutive as well. At first I wanted show all the modes and functionality in the header thru icons but there is only limited space when viewed in small screen.
- This is where I created an inner menu drop down, now the problem is that playing area is getting smaller and smaller as I am adding another on of top screen.
- I fixed this by inverting the color of the ball and toggling between showing and hiding the inner menu. Now the app has a header and the ball bounces in full screen.
- The mode selection options are all related so its only one function. The sounds and background are separate. At first I was hardcoding a function that closes the inner menu when other options are clicked but it would for some and will not for others.
- Then I created a separate function that will just close the inner menu regardless of what is clicked.

**Design and Flourishes**

- To keep the clean and minimal look:
- I opted for only font type and solid colors for header and background color choices.
- The main title and "keep going at it" messages that flash every 20th score changes hue gradually.
- I added a chime that plays every 100 points.
- Some icons mutate and changes color when clicked.
- I used colors and icon mutation to guide the user what should they do next specifically after game over.

**Known Issues**

- The ball sometimes "runs" in the paddle
- After game over the ball remains in the page, you can click on clicking the play button and the ball will still keep on incrementing its Y position. This is where I used the icon mutation and colors to guide the user what to do next. Instead of flashing a message to restart.

**Future Plans**

- Re-write this using object oriented pogramming principles.
- Fix the ball "running" issue
- Improve the collision detection function. A more advance approach is alter the velocity of the ball depending on where it hit the paddle.

**Acknowledgement**

- Lots of youtube tutorials
- LinkedIn Learning
- My app tester J.K.
- And the excellent instructors at PerScholas
