var boardSize = 9;



class Minesweeper
{

	constructor()
	{
		this.mines = initMineField()
		this.revealed = initRevealed()
		this.initializeBoard()
	}

	initMineField()
	{
		var rows = []
		var cols = []
		for (var i = 0; i < boardSize + 1; i++)
		{
			rows[i] = Math.floor(Math.random() * 8)
			cols[i] = Math.floor(Math.random() * 8)
			console.log(rows[i], cols[i])
		}
		grid = new Array(boardSize)
		for (var i = 0; i < boardSize; i++)
		{
			grid[i] = new Array(boardSize)
			for (var j = 0; j < boardSize; j++)
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
		grid = new Array(boardSize)
		for (var i = 0; i < boardSize; i++)
		{
			grid[i] = new Array(boardSize)
			for (var j = 0; j < boardSize; j++)
			{
				grid[i][j] = 0
			}
		}
		return grid
	}


	initializeBoard()
	{
		grid = this.mines
		var container = document.getElementById("gridContainer")
		for (var i = 0; i < boardSize; i++)
		{
			var row = document.createElement("div")
			row.className = "row"
			container.appendChild(row)
			for (var j = 0; j < boardSize; j++)
			{
				var tile = document.createElement("div")
				tile.classList.add("tile")
				if (grid[i][j] == 1) //mine
				{
					tile.classList.add("mine")
					tile.addEventListener("click", mineClick, false)
				}
				else 
				{

					console.log("As a parameter: " + this.mines)
					var object = this
					tile.classList.add("empty")
					tile.addEventListener("click", emptyClick, false)
					tile.game = object

				}
				tile.id = "tile" + i + j
				row.appendChild(tile)
			}
		}
	} 

	reveal(i, j)
	{
		console.log("Checking " + i + j)
		if (i < 0 || i > 8 || j < 0 || j > 8) // OOB
		{
			return
		}
		if (this.mines[i][j] == 0 && this.revealed[i][j] == 0) // not a mine and not revealed 
		{
               this.revealed[i][j] = 1;
               var adjacents = adjacentCells(i, j)
               console.log("Adjacents: " + adjacents)
               var tile = document.getElementById("tile" + i + j)
               var mineNumber, nonMines;
               mineNumber = mineCount(adjacents)
               var tile = document.getElementById("tile" + i + j)
               tile.innerHTML = mineNumber
               if (mineNumber != 0)
               {
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

	emptyClick(game)
	{
		console.log("EMPTY CLICK")
		console.log(game)
		console.log(this)
		console.log("In Empty Click: " + this.mines)
		//i = parseInt(this.id[4]) //row
		//j = parseInt(this.id[5]) //col
		//console.log(i, j)
		//console.log(game)
		//alert("SAFE!")
		//reveal(i, j)
	}

}


//Mines Grid 
function initMineField()
{
	var rows = []
	var cols = []
	for (var i = 0; i < boardSize + 1; i++)
	{
		rows[i] = Math.floor(Math.random() * 8)
		cols[i] = Math.floor(Math.random() * 8)
		console.log(rows[i], cols[i])
	}
	grid = new Array(boardSize)
	for (var i = 0; i < boardSize; i++)
	{
		grid[i] = new Array(boardSize)
		for (var j = 0; j < boardSize; j++)
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

function initRevealed()
{
	grid = new Array(boardSize)
	for (var i = 0; i < boardSize; i++)
	{
		grid[i] = new Array(boardSize)
		for (var j = 0; j < boardSize; j++)
		{
			grid[i][j] = 0
		}
	}
	return grid
}


//Prints the mines grid
function printMineField(grid)
{
	for (var i = 0; i < boardSize; i++)
	{
		var line = ""
		for (var j = 0; j < boardSize; j++)
		{
			line += grid[i][j]
		} 
		console.log(line)
	}
}


function initializeBoard(grid)
{
	var container = document.getElementById("gridContainer")
	for (var i = 0; i < boardSize; i++)
	{
		var row = document.createElement("div")
		row.className = "row"
		container.appendChild(row)
		for (var j = 0; j < boardSize; j++)
		{
			var tile = document.createElement("div")
			tile.classList.add("tile")
			if (grid[i][j] == 1) //mine
			{

				tile.classList.add("mine")
				tile.addEventListener("click", mineClick, false)
			}
			else 
			{
				tile.classList.add("empty")
				tile.addEventListener("click", emptyClick, false)

			}
			tile.id = "tile" + i + j
			row.appendChild(tile)
		}
	}
}

function render(previousGrid, currentGrid)
{
	var container = document.getElementById("gridContainer")
	for (var i = 0; i < boardSize; i++)
	{
		document.createElemen("gridContainer")
		for (var j = 0; j < boardSize; j++)
		{
			//if (currentGrid[i][j] != )	

		}
	}
}

function mineClick()
{

	console.log(this.id)
	alert("BOOOM!")
}
/*
function emptyClick()
{
	console.log(this.id)
	i = parseInt(this.id[4]) //row
	j = parseInt(this.id[5]) //col
	alert("SAFE!")
	var tileClicked = grid[i][j]

	var adjacents = adjacentCells(i, j)
	for (var l = 0; l < adjacents.length; l++)
	{
		var adjacentsOfAdj = adjacentCells(adjacents[l][0], adjacents[l][1])
		var mineCounter = 0;
		for (var k = 0; k < adjacentsOfAdj.length; k++)
		{
			console.log(adjacentsOfAdj[k])
			if (grid[adjacentsOfAdj[k][0]][adjacentsOfAdj[k][1]] == 1)
			{
				mineCounter += 1;
				console.log("Mine at " + adjacentsOfAdj[k][0] + ", " + adjacentsOfAdj[k][1])
			}
		}
		if (mineCounter == 0)
		{
			var adjacentsOfAdj = adjacentCells(adjacents[l][0], adjacents[l][1])
			var mineCounter = 0;
			for (var k = 0; k < adjacentsOfAdj.length; k++)
			{
				console.log(adjacentsOfAdj[k])
				if (grid[adjacentsOfAdj[k][0]][adjacentsOfAdj[k][1]] == 1)
				{
					mineCounter += 1;
					console.log("Mine at " + adjacentsOfAdj[k][0] + ", " + adjacentsOfAdj[k][1])
				}
			}
			
		}
		var tile = document.getElementById("tile" + adjacents[l][0] + adjacents[l][1])
		tile.innerHTML = mineCounter
		console.log("Mine Counter: " +  mineCounter + " at " + adjacents[l][0] + ", " + adjacents[l][1])

	}
}

function emptyClick()
{
	i = parseInt(this.id[4]) //row
	j = parseInt(this.id[5]) //col
	//alert("SAFE!")
	var tileClicked = grid[i][j]
	console.log([[i, j]])
	var seenBefore = new Set()

	var nonMines = new Array()
	nonMines = updateMineCount(i, j)
	console.log("Before while, " + 	seenBefore)
	while (nonMines.length != 0)
	{
		console.log("After while, " + seenBefore)
		console.log("Checking " + nonMines[0])
		next = nonMines.shift()
		seenBefore.add([next[0], next[1]])
		newZeroMines = updateMineCount(next[0], next[1])
		var spliceIndexes = []
		for (var k = 0; k < newZeroMines.length; k++)
		{
			for (var l = 0; l < seenBefore.length; l++)
			{
				//console.log(newZeroMines[k][0] + " == " + seenBefore[l][0] + " && " + newZeroMines[k][1] + " == " + seenBefore[l][1])
				//if (newZeroMines[k][0] == seenBefore[l][0] && newZeroMines[k][1] == seenBefore[l][1])
				if (seenBefore.has([newZeroMines[k]]))
				{
					console.log("TRUE")
					spliceIndexes.push(k)

				}
			}
		}
		for (var k = 0; k < spliceIndexes.length; k++)
		{
			newZeroMines.splice(spliceIndexes[k], 1)
		}
		nonMines = nonMines.concat(newZeroMines);
	}
}

function emptyClick()
{
	i = parseInt(this.id[4]) //row
	j = parseInt(this.id[5]) //col
	//alert("SAFE!")
	var first = true
	var seenBefore = new Set()
	var adjacents = adjacentCells(i, j)

	var mineNumber = mineCount(adjacents)
	var nextMines = []

	var tile = document.getElementById("tile" + i + j)
	tile.innerHTML = mineNumber

	while (nextMines.length != 1 || first)
	{
		for (var k = 0; k < adjacents.length; k++)
		{
			if (!seenBefore.has(adjacents[k]))
			{
				console.log("New tile at " + adjacents[k][0] +  adjacents[k][1])
				seenBefore.add(adjacents[k])
				var mineNumber = mineCount(adjacentCells(adjacents[k][0], adjacents[k][1]))
				if (mineNumber == 0)
				{
					nextMines.push(adjacents[k])
				}
				var tile = document.getElementById("tile" + adjacents[k][0] + adjacents[k][1])
				tile.innerHTML = mineNumber

			}

		}
		var temp = nextMines.shift()
		i = temp[0]
		j = temp[1]
		adjacents = adjacentCells(i, j)
		first = false
	}

}
*/

function emptyClick(event)
{
	alert("empty")
	console.log("EMPTY CLICK")
	console.log(event.target.game)
	console.log("In Empty Click: " + this.mines)
	i = parseInt(this.id[4]) //row
	j = parseInt(this.id[5]) //col
	console.log(i, j)
	//console.log(game)
	//alert("SAFE!")
	game.reveal(i, j)
}

function updateMineCount(i, j)
{
	var adjacents = adjacentCells(i, j)
	console.log("Adjacents: " + adjacents)
	var tile = document.getElementById("tile" + i + j)
	var mineNumber, nonMines;
	[mineNumber, nonMines] = mineCount(adjacents)
	//console.log(mineNumber + " for " + "tile" + i + j)
	tile.innerHTML = mineNumber
		//console.log(nonMines)
	if (mineNumber == 0)
	{
		return nonMines
	}
	else 
	{
		return []
	}
}

function checkUp(i, j)
{
	if (i + 1 < boardSize) //in bounds
	{
		
	}
}



function adjacentCells(i, j)
{
	adjacents = []
	if (i + 1 < boardSize)
	{
		adjacents.push([i + 1, j])
		if (j + 1 < boardSize)
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
		if (j + 1 < boardSize)
		{
			adjacents.push([i - 1, j + 1])
		}
		if (j - 1 >= 0)
		{
			adjacents.push([i - 1, j - 1])
		}
	}
	if (j + 1 < boardSize)
	{
		adjacents.push([i, j + 1])
	}
	if (j - 1 >= 0)
	{
		adjacents.push([i, j - 1])
	}
	return adjacents
}

function mineCount(adjs)
{
	var mineCounter = 0;
	var nonMines = []
	for (var k = 0; k < adjs.length; k++)
	{
		if (grid[adjs[k][0]][adjs[k][1]] == 1)
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

document.addEventListener("DOMContentLoaded", function()
{
	//var mines = initMineField()
	//printMineField(mines)
	//	initializeBoard(mines)
	//var game = new Minesweeper()

});
