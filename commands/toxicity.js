
require('@tensorflow/tfjs');
const toxicity = require('@tensorflow-models/toxicity');

module.exports = {
    name: 'toxicity',
    // aliases: ['system', 'channel'],
	description: 'return toxicity information',
	execute(message, args) {
        console.log('toxicity arguyment');
        // The minimum prediction confidence.
        const threshold = 0.9;

        // Load the model. Users optionally pass in a threshold and an array of
        // labels to include.
        const sentences = ['you suck'];

        console.log(sentences[0]);
        toxicity.load(threshold).then(model => {
            console.log('dfd');
            model.classify(sentences).then(predictions => {
            // `predictions` is an array of objects, one for each prediction head,
            // that contains the raw probabilities for each input along with the
            // final prediction in `match` (either `true` or `false`).
            // If neither prediction exceeds the threshold, `match` is `null`.

                console.log('test log');
                message.channel.send(predictions);
            });
        });
    },
};