Here are the steps to implement this animated background on your website

1. Copy and paste the following into the head tag of your HTML file

    ><script src = "bouncy_balls_script.js" defer></script><br>
    >\<link rel="stylesheet" href="bouncy_balls_styles.css">

2. Copy and paste this tag to wherever you would like the animated background to go

    >\<canvas id="balls-canvas"></canvas>
    >
3. Copy and paste following files into the same directory as your html page

    > <a href = "https://github.com/Tomislav-Zigo/Web-dev-magic/blob/main/bouncy_balls/bouncy_balls_script.js">bouncy_balls_script.js</a> </br>
    > <a href = "https://github.com/Tomislav-Zigo/Web-dev-magic/blob/main/bouncy_balls/bouncy_balls_styles.css">bouncy_balls_styles.css</a><br>

4. Copy and paste this at the end of the body tag in your HTML file and set the width and height variables

    >   <script> <br>
    >       setDarkMode(true);<br>
    >       setCanvasDimensions(width,height);<br>
    >       setTheme(0);<br>
    >   </script><br>

You can execute these functions anywhere in your JavaScript for your page to set the dimensions of the background, toggle dark mode, and set the theme.

    setDarkMode(boolean);
    setCanvasDimensions(width,height);
    setTheme(0-2);
