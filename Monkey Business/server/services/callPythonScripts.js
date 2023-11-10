import cp from 'child_process'

//function getMonkeyPosition
//Runs the python script to record a live stream for (segments * 5) seconds
//Then runs the movement detection algorithm on the video.t
//INPUT
/************************ */
//url - the URL of the youtube livestream to process
//segments - how many 5 second segments to record
//OUTPUT
/************************ */
//CoordSpace - the assortment of x and y positions of detected movements.
//temp.ts - a video file of the last recorded livestream.
export async function getMonkeyPosition (url, segments) {
  const ls = cp.spawn('python', ['./python/MonkeyTracking.py', url, segments])
  var coordSpace = [];
  var result = '';
  var width = 0;
  ls.stdout.on('data', (data) => {
    result += data
    var char = '\n';
    var i = 0;
    var j = 0;
    var index = 0;
    var j = result.indexOf(char, i);
    width = result.substring(i, j);
    i = j + 1;
    while ((j = result.indexOf(char, i)) !== -1) {
      var space = result.indexOf(' ', i);
      const coord = {x: result.substring(i, space), y: result.substring(space, j)};
      coordSpace[index] = coord;
      index = index+1;
      i = j + 1;
    }
  })
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })
  ls.on('close', (code) => {
    console.log(`${width}`)
    for (let i = 0; i < coordSpace.length; i++) {
      console.log(`x: ${coordSpace[i].x}, y: ${coordSpace[i].y}`);if (i==0){
        const ls = cp.spawn('python', ['./python/MPosToChoice.py', coordSpace[i].x, width])
       }
    }
  })
}

export async function getStockShort (stockNameArray) {
  return new Promise((resolve, reject) => {
    const ls = cp.spawn('python', ['./python/GetStockInfo.py', stockNameArray])
    let stdoutData = ''
    let stderrData = ''

    ls.stdout.on('data', (data) => {
      stdoutData += data
    })

    ls.stderr.on('data', (data) => {
      stderrData += data
    })

    ls.on('error', (err) => {
      reject(err)
    })

    ls.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`child process exited with code ${code}: ${stderrData}`))
      } else {
        resolve(stdoutData)
      }
    })
  })
}

export function getStockDetails (stockName, timeFrameMonths) {
  return new Promise((resolve, reject) => {
    const ls = cp.spawn('python', ['./python/GetClosingPriceList.py', stockName, timeFrameMonths])
    let stdoutData = ''
    let stderrData = ''

    ls.stdout.on('data', (data) => {
      stdoutData += data
    })

    ls.stderr.on('data', (data) => {
      stderrData += data
    })

    ls.on('error', (err) => {
      reject(err)
    })

    ls.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`child process exited with code ${code}: ${stderrData}`))
      } else {
        resolve(stdoutData)
      }
    })
  })
}

export function searchStockAPI (searchQuery, start, end) {
  return new Promise((resolve, reject) => {
    const ls = cp.spawn('python', ['./python/StockSearchList.py', searchQuery, start, end])
    let stdoutData = ''
    let stderrData = ''

    ls.stdout.on('data', (data) => {
      stdoutData += data
    })

    ls.stderr.on('data', (data) => {
      stderrData += data
    })

    ls.on('error', (err) => {
      reject(err)
    })

    ls.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`child process exited with code ${code}: ${stderrData}`))
      } else {
        resolve(stdoutData)
      }
    })
  })
}
