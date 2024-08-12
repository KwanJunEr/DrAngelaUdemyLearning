import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const userURL = answers.URL;

    // Generate QR code from the URL
    var qr_svg = qr.image(userURL);
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));

    // Optionally, you can get the SVG as a string
    const svg_string = qr.imageSync(userURL, { type: "svg" });

    // Save the URL to a text file
    fs.writeFile("URL.txt", userURL, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something went wrong:", error);
    }
  });
