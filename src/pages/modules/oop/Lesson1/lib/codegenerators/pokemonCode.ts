// Allowed programming languages for code generation
type Language =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "csharp"
  | "cpp"
  | "go"
  | "php";

// Shape of the Pokémon object used as input
type Pokemon = {
  name: string; // Pokémon name (example: pikachu)
  type: string; // Pokémon type (example: electric)
};

// Main function that generates code
export function generatePokemonCode(
  language: Language, // selected language
  pokemon: Pokemon,   // Pokémon data
) {
  // Extract name and type from object
  const { name, type } = pokemon;

  // Select code template based on language
  switch (language) {

    // =========================
    // TYPESCRIPT VERSION
    // =========================
    case "typescript":
      return `// Define a class (blueprint for objects)
class Pokemon {
  name: string; // property: stores name
  type: string; // property: stores type

  // Constructor: runs when object is created
  constructor(name: string, type: string) {
    this.name = name; // assign parameter to property
    this.type = type; // assign parameter to property
  }

  // Method: displays Pokémon info
  display(): void {
    console.log(\`Name: \${this.name}\`); // print name
    console.log(\`Type: \${this.type}\`); // print type
  }
}

// Create an object (instance of class)
const ${name}: Pokemon = new Pokemon("${name}", "${type}");

// Call method to show data
${name}.display();
`;

    // =========================
    // PYTHON VERSION
    // =========================
    case "python":
      return `# Define a class
class Pokemon:

    # Constructor: runs when object is created
    def __init__(self, name, type):
        self.name = name  # store name
        self.type = type  # store type

    # Method: display info
    def display(self):
        print(f"Name: {self.name}")  # print name
        print(f"Type: {self.type}")  # print type

# Create object
${name} = Pokemon("${name}", "${type}")

# Call method
${name}.display()
`;

    // =========================
    // JAVA VERSION
    // =========================
    case "java":
      return `// Define class
class Pokemon {

    String name; // property
    String type; // property

    // Constructor
    Pokemon(String name, String type) {
        this.name = name; // assign value
        this.type = type; // assign value
    }

    // Method: display info
    void display() {
        System.out.println("Name: " + name); // print name
        System.out.println("Type: " + type); // print type
    }
}

// Create object
Pokemon ${name} = new Pokemon("${name}", "${type}");

// Call method
${name}.display();
`;

    // =========================
    // C# VERSION
    // =========================
    case "csharp":
      return `// Define class
class Pokemon {

    public string Name { get; set; } // property
    public string Type { get; set; } // property

    // Constructor
    public Pokemon(string name, string type) {
        Name = name; // assign value
        Type = type; // assign value
    }

    // Method: display info
    public void Display() {
        Console.WriteLine($"Name: {Name}"); // print name
        Console.WriteLine($"Type: {Type}"); // print type
    }
}

// Create object
var ${name} = new Pokemon("${name}", "${type}");

// Call method
${name}.Display();
`;

    // =========================
    // C++ VERSION
    // =========================
    case "cpp":
      return `#include <iostream> // input/output library
using namespace std; // allows use of cout

// Define class
class Pokemon {
public:
    string name; // property
    string type; // property

    // Constructor
    Pokemon(string n, string t) {
        name = n; // assign value
        type = t; // assign value
    }

    // Method: display info
    void display() {
        cout << "Name: " << name << endl; // print name
        cout << "Type: " << type << endl; // print type
    }
};

int main() {
    // Create object
    Pokemon ${name}("${name}", "${type}");

    // Call method
    ${name}.display();
}
`;

    // =========================
    // GO VERSION
    // =========================
    case "go":
      return `package main

import "fmt" // import formatting library

// Define struct (similar to class)
type Pokemon struct {
    Name string // property
    Type string // property
}

// Method attached to struct
func (p Pokemon) Display() {
    fmt.Println("Name:", p.Name) // print name
    fmt.Println("Type:", p.Type) // print type
}

func main() {
    // Create object
    ${name} := Pokemon{Name: "${name}", Type: "${type}"}

    // Call method
    ${name}.Display()
}
`;

    // =========================
    // PHP VERSION
    // =========================
    case "php":
      return `<?php
// Define class
class Pokemon {

    public $name; // property
    public $type; // property

    // Constructor
    function __construct($name, $type) {
        $this->name = $name; // assign value
        $this->type = $type; // assign value
    }

    // Method: display info
    function display() {
        echo "Name: " . $this->name . "\\n"; // print name
        echo "Type: " . $this->type . "\\n"; // print type
    }
}

// Create object
$${name} = new Pokemon("${name}", "${type}");

// Call method
$${name}->display();
?>
`;

    // =========================
    // JAVASCRIPT DEFAULT
    // =========================
    default:
      return `// Define class
class Pokemon {

  // Constructor
  constructor(name, type) {
    this.name = name; // store name
    this.type = type; // store type
  }

  // Method: display info
  display() {
    console.log("Name:", this.name); // print name
    console.log("Type:", this.type); // print type
  }
}

// Create object
const ${name} = new Pokemon("${name}", "${type}");

// Call method
${name}.display();
`;
  }
}