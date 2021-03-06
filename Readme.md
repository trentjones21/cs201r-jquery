# CS 201R Creative Project 2

A simple chat application that allows friends to share youtube videos, watch them at the same time, and talk about them.  To share a youtube video, all they need to do is paste the youtube link in to a chat message and it will start playing the video for all users. 

## chat.js
There is a file called chat.js that handles all the interactions between the view and the api.  In order to use it, you just need to add a few things to your html.  

### Load jquery & chat.js in your html
Since chat.js depends on Jquery, you must load jquery first.  Adding this to the `<head>` of your html should do the trick
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="./chat.js"></script>
    
### Add the correct elements
chat.js expects 4 elements to be found in your html.  It finds these 4 elements by looking for their ids.  The 4 ids are

1. #chat
2. #status
3. #input
4. #youtube

These elements can be anywhere on your page, and in any order, so style them however you want.  `chat.js` will automatically populate these divs with the appropriate content.

### Explanation of elements
Here is a short explanation of what each of the 4 required html elements are used for

#### #chat
This is where the chat messages are printed.  `chat.js` automatically assigns the users color to it.  If you want more styling beyond that, `chat.js` gives each message the `message` class, so you can use that class in your css to style the specific messages.  For example
    
    .message {
        background: blue;
    }
    .message span {
        color: pink
    }
    
#### #status
This element gets filled with useful information for the uses, such as errors and prompts for the user

#### #input
A simple html input field for the user to type in

#### #youtube
This is where the youtube video will get loaded when they post a youtube video
    
## Simple Example
This is about as simple of an example as you can get.  Feel free to copy and paste it in to a file to get started
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>WebSockets - Simple chat</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="./chat.js"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="chat"></div>
    <span id="status">Connecting...</span>
    <input type="text" id="input" disabled="disabled" />
    <div id="youtube"></div>
</body>
</html>
```
