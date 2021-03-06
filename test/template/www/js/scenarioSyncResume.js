var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('resume', this.onResume, false);
    },
    onDeviceReady: function () {
        app.receivedDeviceReady();
    },
    onResume: function () {
        app.sendTestMessage("APPLICATION_RESUMED");
    },
    // Update DOM on a Received Event
    receivedDeviceReady: function () {
        document.getElementById("deviceready").innerText = "Device is ready (scenario - sync on resume with no minbackdur)";
        console.log('Received Event: deviceready');
        /* invoke sync with no UI options */
        window.codePush.sync(
            function (status) {
                // only output result statuses
                switch(status) {
                    case SyncStatus.UP_TO_DATE:
                    case SyncStatus.UPDATE_INSTALLED:
                    case SyncStatus.UPDATE_IGNORED:
                    case SyncStatus.ERROR:
                    case SyncStatus.IN_PROGRESS:
                        app.sendTestMessage("SYNC_STATUS", [status]);
                    default:
                        break;
                }
            },
            {
                installMode: InstallMode.ON_NEXT_RESUME
            });
    },
    sendTestMessage: function (message, args) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "CODE_PUSH_SERVER_URL/reportTestMessage", false);
        var body = JSON.stringify({ message: message, args: args });
        console.log("Sending test message body: " + body);

        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(body);
    }
};

app.initialize();