// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map(movie => movie.director)
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const filteredMovies = moviesArray.filter(movie => {
    return movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
  })
  return filteredMovies.length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) {
    return 0
  }
  const sumScores = moviesArray.reduce((acc, currentMovie) => {
    if (!currentMovie.score) {
      return acc
    }
    return acc + currentMovie.score
  }, 0)
  return Number((sumScores / moviesArray.length).toFixed(2))
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter(movie => movie.genre.includes("Drama"))
  if (dramaMovies.length === 0) {
    return 0
  }
  const sumDramaScores = dramaMovies.reduce((acc, currentDrama) => {
    if (!currentDrama.score) {
      return acc
    }
    return acc + currentDrama.score
  }, 0)

  return Number((sumDramaScores / dramaMovies.length).toFixed(2))

}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const moviesArrayCopy = moviesArray.slice(0)
  return moviesArrayCopy.sort((a, b) => {
    if (a.year < b.year) {
      return - 1
    } else if (a.year > b.year) {
      return 1
    } else {
      const nameA = a.title.toLowerCase()
      const nameB = b.title.toLowerCase()
      if (nameA < nameB) {
        return -1
      } else if (nameA > nameB) {
        return 1
      } else {
        return 0
      }
    }
  })
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const moviesArrayCopy = [...moviesArray]
  const listOfTitles = moviesArrayCopy.map(movie => movie.title)
  const sortedMovies = listOfTitles.sort((a, b) => {
    const nameA = a.toLowerCase()
    const nameB = b.toLowerCase()
    if (nameA < nameB) {
      return -1
    } else if (nameA > nameB) {
      return 1
    } else {
      return 0
    }
  })

  if (sortedMovies.length < 20) {
    return sortedMovies
  } else {
    return sortedMovies.slice(0, 20)
  }
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const moviesArrayCopy = [...moviesArray]

  const convertedArray = moviesArrayCopy.map(movie => {

    movie.duration = movie.duration.split(" ")

    const durationArr = movie.duration.map(el => {
      if (el.includes("h")) {
        return parseFloat(el) * 60
      } else {
        return parseFloat(el)
      }
    })

    movie.duration = durationArr.reduce((acc, currentTime) => acc + currentTime)
    return movie
  })

  return convertedArray
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) {
    return null
  }
  // Create a new Array of Objects with years sorted and an empty scores Array property
  const yearsArr = moviesArray
    .map(elem => elem = elem.year)
    .filter((elem, i, arr) => arr.indexOf(elem) === i)
    .sort()
    .map(elem => ({ year: elem, scores: [] }))
  // Iterate inside the new years Array      
  yearsArr.forEach(elem => {
    // Iterate inside the Movies Array an push the score value if is the same year 
    moviesArray.forEach(movie => {
      if (elem.year === movie.year) {
        elem.scores.push(movie.score)
      }
    })
    // Reduce the scores and calculate the average for every year
    const scoresSum = elem.scores.reduce((acc, current) => acc + current)
    elem.averageScore = scoresSum / elem.scores.length
  })
  yearsArr.sort((a, b) => b.averageScore - a.averageScore)
  return `The best year was ${yearsArr[0].year} with an average score of ${yearsArr[0].averageScore}`

}