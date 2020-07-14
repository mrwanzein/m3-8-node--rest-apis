const { v4: uuidv4 } = require('uuid');
const { clients } = require('../data/clients');

// write your handlers here...
const getAllClients = (req, res) => {
    if(clients) {
        res.status(200).json({
            status: 200,
            clients: clients
        });
    } else {
        res.status(404).json({
            status: 404,
            Error: "Couldn't find ressource"
        });
    }
}

const getClient = (req, res) => {
    const {id} = req.params;
    let client = clients.filter(client => client.id === id);

    if(client.length !== 0) {

        res.status(200).json({
            status: 200,
            clients: client
        });
    } else {
        res.status(404).json({
            status: 404,
            Error: "Couldn't find client or no longer exist"
        });
    }
}

const createClient = (req, res) => {
    let flag = false;
    
    const newClient = req.body;
    const id = uuidv4();

    clients.forEach(client => {
        if(client.address === newClient.address) return flag = true;
    })

    if(!flag) {
        newClient.id = id;
        clients.push(newClient);

        res.status(201).json({
            status: 201,
            'success': 'client added'
        });
    } else {
        res.status(400).json({
            status: 400,
            Error: "Couldn't create client"
        });
    }
}

const deleteClient = (req, res) => {
    const {id} = req.params;
    let clientsIds = clients.map(clients => clients.id);
    
    if(clientsIds) {
        clients.splice(clientsIds.indexOf(id), 1);

        res.status(200).json({
            status: 200,
            'success': 'client deleted'
        });
    } else {
        res.status(404).json({
            status: 404,
            Error: "Couldn't find client or no longer exist"
        });
    }
}

module.exports = { getAllClients, getClient, createClient, deleteClient }