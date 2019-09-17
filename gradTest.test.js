function createMenuData(data) {
var dict = {};

for (i = 0; i < data.length; i++) {
	// ignore if '/' character isn't present
	if (data[i].includes("/")) {
		// split string by the '/' character
		var combo = data[i].split("/");
		
		// check if parent is present in the dictionary
		if (combo[0] in dict) {
			// push new child into the array 
			var child = dict[combo[0]];
			child.push(combo[1]);
			dict[combo[0]] = child;
		}
		else {
			// create new dictionary key and insert new child
			var child = [combo[1]];
			dict[combo[0]] = child;
		}
	}
}

var arr = [];

for(var key in dict) {
	var value = dict[key];
	var record = {title:key, data:value};	// new object
	
	// push new object into the object array
	arr.push(record);
}

return arr;
}

describe("menu Data Generator", () => {
    it("creates correct data structure ", () => {
      const data = [
        "parent1/parent1child",
        "parent1/parent1child2",
        "parent2/parent2child",
        "parent2/parent2child2",
        "parent1/parent1child3",
        "parent3",
        "parent3/parent3child1",
        "parent4"
      ];
  
      const expectedResult = [
        {
          title: "parent1",
          data: ["parent1child", "parent1child2", "parent1child3"]
        },
        { title: "parent2", data: ["parent2child", "parent2child2"] },
        { title: "parent3", data: ["parent3child1"] }
      ];
  
      const actualResult = createMenuData(data);
      expect(actualResult).toMatchObject(expectedResult);
    });
  });