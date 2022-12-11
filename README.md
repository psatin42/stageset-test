# stageset-test
Test case for stageset

1.A simple front with one text input field and one submit button. After clicking the submit button an api method on the backend is being called. Each session should possess a random session ID.

2.A simple backend which should store new records in the database after corresponding api is called. Records in the database should contain, timestamp, session ID and text from the input itself.

3.*After having the client and the server ready, add sockets mechanism for communication between sessions binded to the following usage pattern. First user enters some new text into input on the frontend. This new text updates immediately input for the second user. Prepare to discuss related problems about this approach in the interview.

