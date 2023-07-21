

export default function SingleNotification() {


    const faketitle = "TItle"
    const fakecontent = "asdflkjasdfklasdjflaksdjfalskdjfalskd jfalskd fjalskdfj alskd fjaslkdf ajsldkf ajsdl;kf ajsdflkas jdlksd jfalsdk fjas;ldkf jaslkdf jakls;df  asd f asdflk asdjf aslkdfj"

    return (
        <li className='notif-item'>
            <div className='padding-right'>
                <h4>{faketitle}</h4>
                <p>{fakecontent}</p>
            </div>
            <span className='delete'><u>Delete</u></span>
        </li>
    )

}