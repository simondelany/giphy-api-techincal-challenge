import Axios from "axios";

describe("GIPHY API: Most Popular", () => {
    const requestURL = `${process.env.VUE_APP_GIPHYAPI_MOST_POPULAR}?api_key=${process.env.VUE_APP_GIPHYAPI_KEY}&limit=25&rating=G`;    
    it("response image data has not changed", () => {
        return Axios.get(requestURL).then(res => {
            const imageData = res.data.data
            const sample = imageData[0]
            const keys = Object.keys(sample);
            const formats = Object.keys(sample.images);
            expect(keys).toMatchSnapshot();
            expect(formats).toMatchSnapshot();
        })
    });  
});