export class titleState{
    public title:string = "";
    
}
export enum TitleActionType{
     none="",
}

export interface TitleAction {
    type: TitleActionType,
    payload?: any
}
export function titleAction(newTitle:string): TitleAction {
    return { type: TitleActionType.none, payload:newTitle}
}

export function TitleReducer(currentState: titleState = new titleState(), action: TitleAction): titleState {
    let newState = { ...currentState };
    switch(action.type){
        case TitleActionType.none:
            newState.title = action.payload;
          
            break;
    }
    return newState;

}