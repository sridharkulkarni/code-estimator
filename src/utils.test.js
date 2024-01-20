const { parseFile } = require("./utils");

test('check all lines', () => {
    const fileData = 
    `import java.util.*;

    // file creates on 1st Jan 2020
    // author: @openenvoy
    
    class HelloWorld { // class declaration
    
        //this is another comment line
        public static void main(String[] args) {
            System.out.println("Hello, World!"); // code, not comment
        }
    }`

    const expectedOutput = {
            "totalLines": 12,
            "totalBlankLines": 3,
            "totalLineComments": 3,
            "totalCodeLines": 6
    }

    expect(parseFile(fileData)).toStrictEqual(expectedOutput)
  });