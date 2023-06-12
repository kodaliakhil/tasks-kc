import {Observable} from  'rxjs'


const url = "https://apis.ccbp.in/wiki-search?search=AI"

export const fetchData  = new Observable((subscriber) => {
    fetch(url).then(
        res => res.json()
    ).then(
        info => subscriber.next(info.search_results)
    )
})

