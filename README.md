# web_collector
## To Do
- Add refreshing and filtering from server
- Check wierd broken link error
- Update interface
- Add changing of the filter (view current filter)
> A Vue.js project

## Done
- Add manual move to and from archive
- Check refreshing and add automatic reload after successful refresh
- Add comments crud
- Add favorites filter
- Add archieved filter toogle
- deploy to cloud

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

docker build -t wsfront web_collector
docker run -dit --network wsc-network -p:8080:8080 --name wsfront -v ~/software/javascript/web_collector:/usr/app wsfront 

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

- Add auto refreshing of semaphores on refresh
- Refacto apollo according to https://v4.apollo.vuejs.org/guide-composable/query.html#loading-state 
