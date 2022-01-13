
exports = function(name){
  /*
    Accessing application's values:
    var x = context.values.get("value_name");

    Accessing a mongodb service:
    var collection = context.services.get("mongodb-atlas").db("dbname").collection("coll_name");
    collection.findOne({ owner_id: context.user.id }).then((doc) => {
      // do something with doc
    });

    To call other named functions:
    var result = context.functions.execute("function_name", arg1, arg2);

    Try running in the console below.
  */
  const collection = context.services.get("mongodb-atlas").db("reactVillage").collection("Group");
  const result = collection.insertOne({
    name: name,
    treasurer: context.user.id
  });
  const res = context.functions.execute("updateUserGroup", result.insertedId);
  return {group: result, user: res};
};