import { useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../useFetch";


const Details = () => {
    const getId = useParams();
    const {data,loading,error} = useFetch(`https://meetup-app-beige-two.vercel.app/details/${getId.id}`);
    
    return <>
        <Header/>
        <hr/>
        
        <div className="container">
            {loading && <h1>Loading...</h1>}
            <div className="row">
                <div className="col col-md-6">
                    <h2>{data?.title}</h2>
                    <p>Hosted By: <strong>{data?.hostedBy}</strong></p>
                    <img src={data?.posterUrl} className="img-fluid" height= "600" width="600"/>
                    <h3>Details: </h3>
                    <p>{data?.details}</p>
                    <h3>Additional Information:</h3>
                    <p><strong>Dress Code: </strong>{data?.dressCode}</p>
                    <p><strong>Age Restrictions: </strong>{data?.ageRestrictions}</p>
                    <h3>Event Tags:</h3>
                    {data?.eventTags.map((tag) => <><button className="btn btn-danger mx-2 my-2">{tag}</button></>)}
                </div>
                <div className="col-md-6">
                    <div className="card mx-4 my-2">
                        <div className="card-body">
                            <small>⏲ {data?.startDateAndTime.date} at {data?.startDateAndTime.time} to </small><br/><small>{data?.endDateAndTime.date} at {data?.endDateAndTime.time}</small><br/><br/>
                             <small>📍 {data?.venue.Area} , {data?.venue.street}</small><br/><small>{data?.venue.city}, Zipcode: {data?.venue.zipcode}</small> <br/><br/>
                             <small><strong>₹</strong> {data?.price}</small>
                        </div>
                    </div>
                    <div className="card mx-4 my-2">
                        <div className="card-body">
                            <h2 className="card-title">Speakers: ({data?.speakers.length})</h2>
                            <div className="row">
                            {data?.speakers.map((speaker) => <div className="col-md-6">
                                                            <div className="card border border-4 mx-2 my-2">
                                                                <div className="card-body text-center">
                                                                    <img src={speaker.speakerImgUrl} className="rounded-5 img-fluid" height="100" width="100"/>
                                                                    <h6>{speaker.speakerName}</h6>
                                                                    <small>{speaker.currentRole}</small>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        )}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default Details;