import anecdoteService from '../services/anecdotes';

export const upvote = content => {
  return async dispatch => {

    const copyCat = {
      id: content.id, 
      content: content.content, 
      votes: content.votes + 1
    }
    
    const changedAnecdote = await anecdoteService.changeSave(copyCat);
    dispatch({
      type: 'VOTE',
      data: changedAnecdote
    });
  };
};
export const createNewAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    });
  };
};
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};
  const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
   
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.data
      );
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    case 'SORT':
      return state.sort((a, b) => b.votes - a.votes);

    default:
      return state;
  }
};
export default anecdoteReducer;