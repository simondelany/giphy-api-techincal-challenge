# giphy-test

## Project setup
```
npm install
cp .env.dev .env
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your unit tests with code coverage
```
npm run test:coverage
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Resolving Browser Support Issues

My general approach here has been to use cross browser compatible approaches wherever posible.

I also aimed to ensure that the sizing of elements and the column count would scale with the size of the viewport area / device screen.

I did however run into a couple of issues specific to Microsoft Edge.

### Form Submit

The default autofill mechanisms in Edge were causing issues when attempting to submit a search query. I was seeing the page refresh and errors showing in the console relating to autofill properties.

I managed to resolve this by making the following changes within the search query form:

* Removing type="submit" from the button
* Adding onsubmit="return false;" to the form element itself

(I did also ensure that autocomplete was set to off for the form and the input, however this did not prevent the errors from showing in the console)

The above changes resolved the functional issues with submitting the search however there are still errors showing in the console that I would address also if I had more time.

### Styling

The scaling of the search icon in the search bar was out of step with that of the rest of the search bar.

Again this was only visible in Edge however I suspect that the problem existing in the other browsers but perhaps to a lesser degree.

I had used the unit 'em' to scale the search bar. My logic for that was that as the component was built around a text input element it would be prudent to scale the component based in-line with the font.

The solution here was to switch to the unit 'vmin'. I had already used this unit elsewhere in the app's styling and so it made sense to apply the same unit here. This worked well and having tested again on the other browsers I am certain that this is a better solution than using 'em'. I believe the source of the issue was related to the fact that 'em' is scoped to the element's local context and that the 'em' value was different on the button element from the'em' value on the input element.

### More Styling

Another issue with the styling on Edge is that the GIFs are being stretched to fill their containers.

On the other browsers they are maintaining their aspect ratios. Their width is being set to the fill their container and their height is left as auto. 

I have not tackled this issue as the current grid system is not ideal. As the gifs are all different aspect ratios the current grid sytem forces either stretching of the image or the addtion of whitespace in the container. My next step with the styling of the GIFs would be to switch to one of the following improved grid strategies:

* Use a seperate container element in each column and spread the image cards evenly between those elments.
  * This would allow me to scale the width of the images to match the width their parent column whilst allowing me to set the image card height to shrink to fit the image height without modifiying the grid grap.

* Use a Masonry style grid approach e.g. using the library vue-masonry

### Tests

#### Manual Testing

* Browser Compatibility - Chrome, Firefox and Edge
* Responsive Design - Chrome Dev-Tools (tested on various sized displays using the device toolbar)
* Feature testing - Interacting with each page to test behaviour of elements and loading of data

#### Unit Testing

##### Implemented
* Render Tests - Take snapshots of html rendered from each vue file.
* API endpoint testing - Ensure that the endpoint is available and providing the data in the format we are expecting

##### Planned
* Individual Method tests - Check output of each method against expected output for sample input
* Vuex Store tests - Ensure data is being fetched and stored correctly (either from API or from local JSON server)
* Data Expiry tests - Fetch data into the store and check that it no longer exists after thre TTL value (@60s & @60m)

#### Integration Testing

I ran out of time to implement any integration tests although the following tests were planned:

##### Infinite Scroller Tests
I planned to use Puppeteer to automate testing of the batching of data within the infinite scroll mechanism. 

One example using puppeteer's chromium browser might take the following steps:

1. Load the app in puppeteer's chromium browser
1. Wait for the page to finish loading
1. Count the initial number of GIFs on the page (using css selector '.gif-card img')
1. Scroll within the grid element to trigger the next batch of GIFs to load
1. Log the number of GIFs found
1. Repeat for a specified number of scrolls

We could then check:

* The number of GIFs loaded is correct for the number of times scrolled (scrollCount * batchSize)
* The snapshot of the html of the GifGrid component at the end of the test matches the test snapshot.
* The time taken

## Conclusion

I have enjoyed trying out the GIPHY API and testing my Vue and Typescript knowledge.

There is obviously more to be done but I hope I have done enough to show you what is possible!
