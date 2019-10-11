# project-week-5
## Authors: 
João Viana, Martha Lambert, Tom Galligan
___
This is the source code for the FACxBeamery graduate training forum. The forum's purpose is to give students and mentors a place to ask questions about the training programme, and source the knowledge of their peers. 

![](https://i.imgur.com/1b0xm2Z.png)


Each time a question is asked, the user must specify the question, the week that question is relevant to (or select "Generic" if the question is for no specific week), and then select their name from the "Select Name" dropdown. If they know the answer to the question, they can add this to a text-area. 

Once a question is submitted, it is added to the forum's question board, and other users can read the questions and add their own answers. ![](https://i.imgur.com/8d4z50P.png)
![](https://i.imgur.com/Uej8TPz.png)

We hope to deploy the training forum online in the near future. 

**Installation instructions**
1. Create a file named `.env` in the root directory. Inside this folder, add the following two lines:
```
DATABASE_URL=mongodb://<url>
DATABASE_URL_TEST=mongodb:<url>
```


2. Then, again in the root directory, run 
```
> npm install
```

3. To start the server, run 
```
> npm start
```
___

For development purposes, run 
```
> npm dev:start 
```
to keep the server running between file changes. 

Any changes you make can be tested by running
```
> npm test
```
