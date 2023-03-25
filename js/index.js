function check() {
    return document.getElementById('input').value !== '';
}

async function deleteWebhook() {
    if (!check()) {
        return;
    }

    let webhookLink = document.getElementById('input').value;
    document.getElementById('delete').disabled = true;

    let responseDELETE = await fetch(webhookLink, {
        method: 'DELETE'
    });

    document.getElementById('input').placeholder = 'Enter webhook link';
    document.getElementById('delete').disabled = false;

    if (responseDELETE.status === 204) {
        // notification
        document.getElementById('notification').innerHTML = `
            <p> Webhook deleted </p>
        `;
        document.getElementById('notification').classList.remove('hide');
    }
}

async function checkWebhook() {
    if (!check()) {
        return;
    }

    let webhookLink = document.getElementById('input').value;
    document.getElementById('check').disabled = true;

    let responseGET = await fetch(webhookLink, {
        method: 'GET'
    });

    if (responseGET.status === 200) {
        let json = await responseGET.json();

        let webhookID = json.id;
        let webhookToken = json.token;
        let webhookName = json.name;
        let webhookChannelID = json.channel_id;
        let webhookGuildID = json.guild_id;
        let webhookApplicationID = json.application_id;
        let webhookType = json.type;


        let webhookTypes = {
            1: 'Incoming',
            2: 'Channel Follower',
            3: 'Application'
        }

        webhookType = webhookTypes[webhookType];

        document.getElementById('notification').innerHTML = `
            <h3>Webhook</h3>
            <p> Webhook Type: <a href="https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types">${webhookType}</a> </p>
            <p> Webhook Name: ${webhookName} </p>
            <p> Webhook ID: ${webhookID} </p>
            <p> Webhook Token: ${webhookToken} </p>
            <h3>Misc</h3>
            <p> Webhook Channel ID: ${webhookChannelID} </p>
            <p> Webhook Guild ID: ${webhookGuildID} </p>
            <p> Webhook Application ID: ${webhookApplicationID} </p>
        `;
        document.getElementById('notification').classList.remove('hide');
    }

    document.getElementById('input').placeholder = 'Enter webhook link';
    document.getElementById('check').disabled = false;
}