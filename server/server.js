const express = require('express')
const app = express()
var parser = require('body-parser');

const Dao = require('./modules/data-access/data-access')
const dao = new Dao();

const Chats = require('./modules/chatModule/chats');
const chats = new Chats();

app.use(parser.json());


// insert new conversation if not exist else add message in older conversation

/*The format of req body for addChatsBetweenUsers
{
"user1":103,
  "user2":102,
  "sender":103,
  "content":"Hello"
}*/

app.post('/rest/api/chats/addChatsBetweenUsers', async (req, res) => {
    let previousConversationStatus = await chats.conversationExist(req.body);
    if (previousConversationStatus) {
        var result = await chats.addMessageInConversation(req.body);
        res.send(result);
    }
    else {
        let result = await chats.newConversation(req.body);
        res.send(result);
    }
})
//get chats between two user1 and user2

/*The format of req body for addChatsBetweenUsers
{
"user1":103,
  "user2":102
}*/

app.post('/rest/api/chats/getchatsBetweenUsers', async (req, res) => {
    let result = await chats.getChatsBetweenUsers(req.body)
    res.send(result)
})

//deletes a single message of given timestamp between user1 and user2
/*The format of req body for deleteSingleMessage
{
"user1":103,
  "user2":102,
  "timestamp":
}*/
app.delete('/rest/api/chats/deleteSingleMessage', async (req, res) => {
    var result = await chats.deleteSingleMessage(req.body);
    console.log(result)
    res.send(result)
})

//gets the users and the last message the given user has conversed with
/*The format of req body for hasConversationsWith
{
"user":103
}*/

app.post('/rest/api/chats/hasConversationsWith', async (req, res) => {
    let result = await chats.hasConversationsWith(req.body)
    console.log(result)
    res.send(result)
})

app.listen('4500', () => console.log('Listening on port 8080'))