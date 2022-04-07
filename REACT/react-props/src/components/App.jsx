export function Card(props){
    return (
        <div> 
        <h2>{props.name}</h2>
        <img src={props.img} alt={props.alt}/>
        <p>{props.tel}</p>
        <p>{props.email}</p>
    </div>
    )
}