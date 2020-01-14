const WIDTH = 1800;
const HEIGHT = 1000;

const v = [0, 0, 0, 0];

const delayMatrix = [];
const matrix = [];

matrix[0] = [1,2,3];
matrix[1] = [1,2,2];
matrix[2] = [1,2,3];
matrix[3] = [1,4,3];


//add delays

for(let i = 0; i < matrix.length; i++){
  for(let j=1;j<=i;j++)
  {
    matrix[i].unshift(0);
  }
}

const rows = matrix.length;
const cols = matrix[0].length;

const input = [1, 2, 3];
const output = [];

let inputIndex = 0;
let process = v.map(c => ({
  a: c,
  in : null,
  out : null
}));

function makeStep() {

  if(inputIndex < input.length){
      process[0].in = input[inputIndex];
  }
  else{
    process[0].in = null;
  }

  inputIndex++; //go to next element in the input list


  //adjust the in,out values
  for (let i = 1; i < process.length; i++) {
    process[i].in = process[i-1].out;
  }


  //compute the in out and a values
  for (let i = 0; i < process.length; i++) {
    if (process[i].in !== null){

      process[i].a = process[i].in * matrix[i][0] + process[i].a;
      process[i].out = process[i].in;


    }else {

      process[i].in = process[i].out = null;

    }
  }

  //remove first element in the matrix cols
  for(let i = 0; i<matrix.length; i++){
      matrix[i].shift();
  }

}


function setup() {
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  clear();
  textAlign(LEFT)
  textSize(35)

  //Allign and edit Inputs layout
  textStyle(BOLDITALIC)
  text('Input Values:', 10, 50)

  textStyle(NORMAL)
  text(input.slice(inputIndex).reverse().join(), 10, 100)



  textStyle(NORMAL)
  text(output.join(),10,200)


  //model the graphics for process rectangles
  process.forEach((process, index) => {

    //everything will be alligned relatively to the top left corner of the rectangle
    const left =  300 * (index + 1)
    const top = HEIGHT / 2 -300;

    //draw the rectangles for processes
    fill(255);
    rect(left, top, 150, 200)
    fill(0);

    //allign the "P"+index and "a" values in the rectangles
    textAlign(CENTER)
    textSize(40)
    text('P' + index, left, top + 30, 160, 50);
    textSize(30)
    text(process.a, left, top + 100, 160, 80);

    //display the values from the matrix
    let increment = 0;

      for(let j = 0; j < matrix[index].length; j++){

        if(matrix[index][j] != 0){
            text(matrix[index][j], left,top + 220 + increment,160,50)
            increment += 30;
          }
        }


    textSize(20)
    //draw the lines between the processes
    line(left - 150, top + 100, left, top + 100)
    line(left + 300, top + 100, left + 150, top + 100)


    if (process.in !== null) {
      textAlign(RIGHT, BOTTOM);
      text(process.in, left - 30, top + 90)
    }

    if (process.out !== null) {
      textAlign(LEFT, BOTTOM);
      text(process.out, left +170, top + 90)
    }

    //draw the delay black rectangles
    if (index > 0) {
      rect(left - 80, top + 85, 20, 30);
    }
  });

}

function mouseClicked() {
  makeStep();
}
