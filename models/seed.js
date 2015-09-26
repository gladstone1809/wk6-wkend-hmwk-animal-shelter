var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose 
seeder.connect('mongodb://localhost/animal-shelter', function() {
    
    // Load Mongoose models 
    seeder.loadModels([
        './models/animals.js'
    ]);
 
    // Clear specified collections 
    seeder.clearModels(['Pet'], function() {
 
        // Callback to populate DB once collections have been cleared 
        seeder.populateModels(pets);
 
    });
});

var pets = [
    { 
        'model': 'Pet',
        'documents': [
            {
                'name': 'Xerxes I',
                'breed': 'Platypus'
            },
            {
                'name': 'Xerxes II',
                'breed': 'Mongoose'
            }
        ]
    }
]; 
