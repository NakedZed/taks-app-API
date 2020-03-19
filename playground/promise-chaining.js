require('../src/db/mongoose');
var Task = require('../src/models/task')

Task.findByIdAndRemove({
    _id: '5e64bff8a8269b4e20a0740f'
}).then((removedTask) => {
    console.log(removedTask)
    return Task.countDocuments({
        completed: false
    })
}).then((result) => {
    console.log(result)
})