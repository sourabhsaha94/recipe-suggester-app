var request = require('supertest');
describe('testing end points',function(){
    let server;
    let sample_string = "Chicken";
    let sample_ingredient_list = "chicken,tomatoes";
    let sample_full_name = "Sheet-Pan Chicken with Tomatoes and Mozzarella";

    beforeEach(function(){
        server = require('../index');
    });
    afterEach(function(){
        console.log("Closing server");
        server.close();
    });

    it('responds to /',function testRoot(done){
        request(server).get('/').expect(200,done);
    });

    it('responds to /recipe-list?title='+sample_string,function testGetList(done){
        request(server).get('/recipe-list?title='+sample_string).expect(200,done);
    });

    it('responds to /recipe-full?title='+sample_full_name,function testGetRecipe(done){
        request(server).get('/recipe-full?title='+sample_full_name).expect(200,done);
    });

    it('responds to /recipe-from-ingredients?ingredients='+sample_ingredient_list,function testGetRecipeFromIngredients(done){
        request(server).get('/recipe-from-ingredients?ingredients='+sample_ingredient_list).expect(200,done);
    });
});
