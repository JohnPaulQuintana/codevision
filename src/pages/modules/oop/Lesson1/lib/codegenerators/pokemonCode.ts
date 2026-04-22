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

// Shape of the Pokémon object we use for generation
type Pokemon = {
  name: string; // Pokémon name (e.g., pikachu)
  type: string; // Pokémon type (e.g., electric)
};

// Main function: generates OOP code depending on selected language
export function generatePokemonCode(
  language: Language, // selected programming language
  pokemon: Pokemon, // selected Pokémon data
) {
  // Extract values from object for easier use in templates
  const { name, type } = pokemon;

  // Choose which code template to generate based on language
  switch (language) {
    // =========================
    // TYPE SCRIPT VERSION
    // =========================
    case "typescript":
      return `// Class definition: blueprint for creating objects
class Pokemon {
  // Properties (data stored in object)
  name: string;
  type: string;

  // Constructor runs when object is created
  constructor(name: string, type: string) {
    this.name = name; // assign parameter to object property
    this.type = type; // assign parameter to object property
  }

  // Method = behavior of the object
  attack(): void {
    console.log(\`\${this.name} uses \${this.type} attack!\`);
  }
}

// Creating an object (instance of class)
const ${name}: Pokemon = new Pokemon("${name}", "${type}");
`;

    // =========================
    // PYTHON VERSION
    // =========================
    case "python":
      return `# Class definition: blueprint for objects
class Pokemon:

    # Constructor: runs when object is created
    def __init__(self, name, type):
        self.name = name  # store name in object
        self.type = type  # store type in object

    # Method: defines behavior
    def attack(self):
        print(f"{name} uses {type} attack!")

# Creating an instance of the class
${name} = Pokemon("${name}", "${type}")
`;

    // =========================
    // JAVA VERSION
    // =========================
    case "java":
      return `// Class definition: blueprint for objects
class Pokemon {

    // Properties (fields)
    String name;
    String type;

    // Constructor: initializes object values
    Pokemon(String name, String type) {
        this.name = name;
        this.type = type;
    }

    // Method: behavior of object
    void attack() {
        System.out.println(name + " uses " + type + " attack!");
    }
}

// Creating object instance
Pokemon ${name} = new Pokemon("${name}", "${type}");
`;

    // =========================
    // C# VERSION
    // =========================
    case "csharp":
      return `// Class definition
class Pokemon {

    // Auto-properties (data storage)
    public string Name { get; set; }
    public string Type { get; set; }

    // Constructor
    public Pokemon(string name, string type) {
        Name = name;
        Type = type;
    }

    // Method: behavior
    public void Attack() {
        Console.WriteLine($"{Name} uses {Type} attack!");
    }
}

// Creating object instance
var ${name} = new Pokemon("${name}", "${type}");
`;

    // =========================
    // C++ VERSION
    // =========================
    case "cpp":
      return `#include <iostream>
using namespace std;

// Class definition
class Pokemon {
public:
    string name; // property
    string type; // property

    // Constructor
    Pokemon(string n, string t) {
        name = n;
        type = t;
    }

    // Method
    void attack() {
        cout << name << " uses " << type << " attack!" << endl;
    }
};

int main() {
    // Creating object instance
    Pokemon ${name}("${name}", "${type}");
}
`;

    // =========================
    // GO VERSION
    // =========================
    case "go":
      return `package main
import "fmt"

// Struct = lightweight class
type Pokemon struct {
    Name string
    Type string
}

// Method attached to struct
func (p Pokemon) Attack() {
    fmt.Println(p.Name + " uses " + p.Type + " attack!")
}

func main() {
    // Creating struct instance
    ${name} := Pokemon{Name: "${name}", Type: "${type}"}

    // Calling method
    ${name}.Attack()
}
`;

    // =========================
    // PHP VERSION
    // =========================
    case "php":
      return `<?php
// Class definition
class Pokemon {

    public $name; // property
    public $type;  // property

    // Constructor
    function __construct($name, $type) {
        $this->name = $name;
        $this->type = $type;
    }

    // Method
    function attack() {
        echo $this->name . " uses " . $this->type . " attack!";
    }
}

// Creating object instance
$${name} = new Pokemon("${name}", "${type}");
?>
`;

    // =========================
    // JAVASCRIPT DEFAULT VERSION
    // =========================
    default:
      return `// Class definition
class Pokemon {

  // Constructor runs when object is created
  constructor(name, type) {
    this.name = "${name}"; // store name
    this.type = "${type}"; // store type
  }

  // Method: behavior of object
  attack() {
    console.log("${name} uses ${type} attack!");
  }
}

// Creating object instance
const ${name} = new Pokemon("${name}", "${type}");
`;
  }
}
