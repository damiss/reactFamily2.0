/* 一个项目有很多reducers 我们要把他们整合在一起 */
import counter from './reducers/counter';

export default function combineReducers(state = {}, action) {
    return {
        counter: counter(state.counter, action)
    }
}