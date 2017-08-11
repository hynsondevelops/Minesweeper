
class Minesweeper
{

	constructor(boardSize)
	{
		this.boardSize = boardSize
		this.mines = this.initMineField()
		this.revealed = this.initRevealed()
		this.initializeBoard()
		//this.playing = true;
	}

	initMineField()
	{
		var rows = []
		var cols = []
		while (rows.length != this.boardSize)
		{
			var tempRow = Math.floor(Math.random() * (this.boardSize - 1))
			var tempCol = Math.floor(Math.random() * (this.boardSize - 1))
			var newEntry = true
			for (var i = 0; i < this.boardSize + 1; i++)
			{
				if (tempRow == rows[i] && tempCol == cols[i])
				{
					newEntry = false
				}
			}
			if (newEntry)
			{
				rows.push(tempRow)
				cols.push(tempCol)
			}
		}
		/*for (var i = 0; i < boardSize + 1; i++)
		{
			rows[i] = Math.floor(Math.random() * boardSize - 1)
			cols[i] = Math.floor(Math.random() * boardSize - 1)
			console.log(rows[i], cols[i])
		}*/
		var grid = new Array(this.boardSize)
		for (var i = 0; i < this.boardSize; i++)
		{
			grid[i] = new Array(this.boardSize)
			for (var j = 0; j < this.boardSize; j++)
			{
				for (var k = 0; k < rows.length; k++)
				{
					if (i == rows[k] && j == cols[k])
					{
						grid[i][j] = 1
						console.log("Mine at " + i + j)
						k = rows.length
					}
					else
					{
						grid[i][j] = 0
					}
				}
			}
		}
		return grid
	}

	initRevealed()
	{
		var grid = new Array(this.boardSize)
		for (var i = 0; i < this.boardSize; i++)
		{
			grid[i] = new Array(this.boardSize)
			for (var j = 0; j < this.boardSize; j++)
			{
				grid[i][j] = 0
			}
		}
		return grid
	}

	countRevealed()
	{
		var counter = 0;
		for (var i = 0; i < this.boardSize; i++)
		{
			for (var j = 0; j < this.boardSize; j++)
			{
				if (this.revealed[i][j] == 1)
				{
					counter += 1;
				}
			}
		}
		return counter
	}


	checkWin()
	{
		if (this.boardSize*this.boardSize - this.countRevealed() == this.boardSize + 1)
		{
			renderMines()
			return true
		}
		else 
		{
			return false
		}
	}


	initializeBoard()
	{
		var grid = this.mines
		var container = document.getElementById("gridContainer")
		for (var i = 0; i < this.boardSize; i++)
		{
			var row = document.createElement("div")
			row.className = "row"
			container.appendChild(row)
			for (var j = 0; j < this.boardSize; j++)
			{
				var tile = document.createElement("div")
				tile.classList.add("tile")
				if (grid[i][j] == 1) //mine
				{
					tile.classList.add("mine")
					tile.addEventListener("mousedown", mineClick, false)
					tile.game = this
				}
				else 
				{

					var object = this
					tile.classList.add("empty")
					tile.addEventListener("mousedown", emptyClick, false)
					tile.game = object

				}
				tile.id = "tile" + i + j
				row.appendChild(tile)
			}
		}
	} 

	reveal(i, j)
	{
		if (i < 0 || i > this.boardSize - 1 || j < 0 || j > this.boardSize - 1) // OOB
		{
			return
		}
		if (this.mines[i][j] == 0 && this.revealed[i][j] == 0) // not a mine and not revealed 
		{
               this.revealed[i][j] = 1;
               var adjacents = this.adjacentCells(i, j)
               var tile = document.getElementById("tile" + i + j)
               var mineNumber, nonMines;
               mineNumber = this.mineCount(adjacents)
               if (mineNumber != 0)
               {
               		var tile = document.getElementById("tile" + i + j)
               		tile.innerHTML = "<p> " + mineNumber + "</p>"
               		return
               }
               this.reveal(i + 1, j);
               this.reveal(i + 1, j + 1);
               this.reveal(i + 1, j - 1)
               this.reveal(i - 1, j);
               this.reveal(i - 1, j + 1)
               this.reveal(i - 1 , j - 1);
               this.reveal(i, j + 1);
               this.reveal(i, j - 1);	
        }
        else 
        {
           return;
        }
	}


	adjacentCells(i, j)
	{
		var adjacents = []
		if (i + 1 < this.boardSize)
		{
			adjacents.push([i + 1, j])
			if (j + 1 < this.boardSize)
			{
				adjacents.push([i + 1, j + 1])
			}
			if (j - 1 >= 0)
			{
				adjacents.push([i + 1, j - 1])
			}
		}
		if (i - 1 >= 0)
		{
			adjacents.push([i - 1, j])
			if (j + 1 < this.boardSize)
			{
				adjacents.push([i - 1, j + 1])
			}
			if (j - 1 >= 0)
			{
				adjacents.push([i - 1, j - 1])
			}
		}
		if (j + 1 < this.boardSize)
		{
			adjacents.push([i, j + 1])
		}
		if (j - 1 >= 0)
		{
			adjacents.push([i, j - 1])
		}
		return adjacents
	}

	mineCount(adjs)
	{
		var mineCounter = 0;
		var nonMines = []
		for (var k = 0; k < adjs.length; k++)
		{
			if (this.mines[adjs[k][0]][adjs[k][1]] == 1)
			{
				mineCounter += 1;
				//console.log("Mine at " + adjacentsOfAdj[k][0] + ", " + adjacentsOfAdj[k][1])
			}
			else
			{
				nonMines.push([adjs[k][0], adjs[k][1]])
			}
		}
		return mineCounter
		//return [mineCounter, nonMines]
		//console.log("Mine Counter: " +  mineCounter + " at " + adjacents[l][0] + ", " + adjacents[l][1])

	} 

}

function renderMines()
{
	var mines = document.getElementsByClassName("mine")
	for (var i = 0; i < mines.length; i++)
	{
		mines[i].innerHTML = "<img src = 'mine.png'>"
	}
}


function mineClick(event)
{
	console.log(event.which)
	if (event.which == 1) //left click
	{
		console.log(this.id)
		renderMines()
		alert("Mine Hit!")
		//event.target.playing = false
		//location.reload()
	}
	else if (event.which == 3) //right click
	{
		this.innerHTML = "<img src = 'flag.png'>"
	}
}

function emptyClick(event)
{
	if (event.which == 1) //left click
	{
		console.log(event.which)
		console.log("EMPTY CLICK")
		console.log(event.target.game)
		console.log("In Empty Click: " + this.mines)
		i = parseInt(this.id[4]) //row
		j = parseInt(this.id[5]) //col
		console.log(i, j)
		//console.log(game)
		//alert("SAFE!")
		event.target.game.reveal(i, j)
		if (event.target.game.checkWin())
		{
			alert("You win!")
		}
	}
	else if (event.which == 3)
	{
		this.innerHTML = "<img src = 'flag.png'>"

	}
}


function NineByNine()
{
	document.getElementById("gridContainer").innerHTML = "";
	var boardSize = 9;
	var game = new Minesweeper(boardSize)
}

function TwentyByTwenty()
{
	document.getElementById("gridContainer").innerHTML = "";

	var boardSize = 20;
	var game = new Minesweeper(boardSize)
}

function ThirtyByThirty()
{
	document.getElementById("gridContainer").innerHTML = "";

	var boardSize = 30;
	var game = new Minesweeper(boardSize)
}


document.addEventListener("DOMContentLoaded", function()
{
	TwentyByTwenty()

});
