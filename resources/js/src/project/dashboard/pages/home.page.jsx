import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {ROUTE_TO_LOGIN_PAGE} from "../../routes";


const HomePage = ({getUser, user}) => {
    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <header id="header" className="fixed-top">
                <div className="container d-flex align-items-center">

                    <h1 className="logo mr-auto"><a href="#">Arman Su</a></h1>

                    <nav className="nav-menu d-none d-lg-block">
                        <ul>
                            <li className="active"><a href="#">Home</a></li>
                            <li><a href="#about">О нас</a></li>
                            <li><a href="#services">Наши продукты</a></li>
                            <li><a href="#contact">Контакты</a></li>

                        </ul>
                    </nav>

                    {user.isNotLoadedUser()
                        ? <Link to={ROUTE_TO_LOGIN_PAGE} className="get-started-btn">Войти</Link>
                        : <button className="get-started-btn b-0"
                                  onClick={e => $("#create_order_modal").modal('show')}>Оформить заказ</button>
                    }


                </div>
            </header>

            <section id="hero">
                <div id="heroCarousel" className="carousel slide carousel-fade" data-ride="carousel">

                    <ol className="carousel-indicators" id="hero-carousel-indicators"/>

                    <div className="carousel-inner" role="listbox">


                        <div className="carousel-item active"
                             style={{"backgroundImage": "url(/img/children.jpg)"}}>
                            <div className="carousel-container">
                                <div className="container">
                                    <h2 className="animate__animated animate__fadeInDown">Питьевая Вода «ArmanSu»</h2>
                                    <p className="animate__animated animate__fadeInUp">Питьева вода из артезианской
                                        скважины #6953, глубиной 255 метров
                                        <br/>Земля покрыта водой на 71%, пресной воды при этом менее 2%, поэтому так
                                        важно ценить наличие чистой питьевой воды.
                                        <br/>ArmanSu предоставляет возможность каждому наслаждаться чистой,
                                        артезианской водой на все 100%, вне зависимости от размеров!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="carousel-item" style={{"backgroundImage": "url(/img/boy.jpg)"}}>
                            <div className="carousel-container">
                                <div className="container">
                                    <h2 className="animate__animated animate__fadeInDown">Знаете ли Вы в чем скрытая
                                        польза артезианской воды?
                                    </h2>
                                    <p className="animate__animated animate__fadeInUp">
                                        Артезианская вода не имеет органических примесей, поэтому вероятности
                                        бактериального или вирусного заражения попросту нет. Кроме того, артезианская
                                        вода проходит многоступенчатую очистку, вследствие чего Вы можете насладиться
                                        вкусной, полезной для здоровья и чистой водой!
                                    </p>
                                    {/*<a href="#about"
                                       className="btn-get-started animate__animated animate__fadeInUp scrollto">Read
                                        More</a>*/}
                                </div>
                            </div>
                        </div>
                        {/*
                        <div className="carousel-item" style={{"backgroundImage": "url(assets/img/slide/slide-3.jpg)"}}>
                            <div className="carousel-container">
                                <div className="container">
                                    <h2 className="animate__animated animate__fadeInDown">Питьевая Вода «ArmanSu»</h2>
                                    <p className="animate__animated animate__fadeInUp">
                                    </p>
                                </div>
                            </div>
                        </div>*/}

                    </div>

                    <a className="carousel-control-prev" href="#heroCarousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon icofont-simple-left" aria-hidden="true"/>
                        <span className="sr-only">Previous</span>
                    </a>

                    <a className="carousel-control-next" href="#heroCarousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon icofont-simple-right" aria-hidden="true"/>
                        <span className="sr-only">Next</span>
                    </a>

                </div>
            </section>

            <div id="main">

                <section id="about" className="about">
                    <div className="container" data-aos="fade-up">

                        <div className="section-title">
                            <h2>Arman Su</h2>
                            <p>Коротко о нас</p>
                        </div>

                        <div className="row content">
                            <div className="col-lg-6">
                                <p>
                                    Знаете ли Вы в чем скрытая польза артезианской воды?
                                    ⠀
                                    Артезианская вода не имеет органических примесей, поэтому вероятности бактериального
                                    или вирусного заражения попросту нет. Кроме того, артезианская вода проходит
                                    многоступенчатую очистку, вследствие чего Вы можете насладиться вкусной, полезной
                                    для здоровья и чистой водой!
                                </p>
                                <p>
                                    Вода Arman Su – это:
                                </p>
                                <ul>
                                    <li><i className="ri-check-double-line"/> вкусная и освежающая волна «живительной
                                        силы»;
                                    </li>
                                    <li><i className="ri-check-double-line"/> настоящая польза в каждом глотке;
                                    </li>
                                    <li><i className="ri-check-double-line"/> качественный и природный продукт;
                                    </li>
                                    <li><i className="ri-check-double-line"/> верный страж Вашего здоровья;
                                    </li>
                                    <li><i className="ri-check-double-line"/> залог здорового образа жизни с доставкой в
                                        офис или на дом.
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-6 pt-4 pt-lg-0">
                                <p>Пока Вы открываете кран и используете воду, кто-то усердно ее добывает!
                                </p>
                                <p>
                                    Вода Arman Su добывается в экологически чистом районе из артезианской скважины,
                                    проходит тщательную очистку и при этом сохраняет все свои вкусовые и полезные
                                    свойства.
                                    Чистая и полезная питьевая вода - это богатство, которым должен обладать каждый
                                    человек.
                                    ⠀
                                    Становитесь богаче с каждым глотком воды
                                    Arman Su и будьте здоровы!
                                </p>
                                <p>
                                    Каждый производственный процесс нуждается в тщательном контроле. Arman Su уделяет
                                    особое внимание контролю качества, ведь наша продукция попадает в Ваши офисы и дома.
                                    Мы тщательно отслеживаем качество производства, поэтому гарантируем пользу нашей
                                    артезианской воды!
                                </p>
                                <p>
                                    Arman Su - с заботой о Вашем здоровье!
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/*<section id="counts" className="counts">
                    <div className="container" data-aos="fade-up">

                        <div className="row no-gutters">

                            <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                                <div className="count-box">
                                    <i className="icofont-simple-smile"></i>
                                    <span data-toggle="counter-up">Доставка</span>
                                    <p> В современных условиях скорость доставки играет
                                        значительную роль.
                                        Мы доставим артезианский "источник" быстро и надежно в офис или на дом!</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                                <div className="count-box">
                                    <i className="icofont-document-folder"></i>
                                    <span data-toggle="counter-up">Команда </span>
                                    <p>Arman Su - это профессиональные специалисты,
                                        которые знают толк в своем деле.
                                        ⠀
                                        </p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                                <div className="count-box">
                                    <i className="icofont-live-support"></i>
                                    <span data-toggle="counter-up">Обслуживание</span>
                                    <p><strong></strong> Компания Arman Su предоставляет не просто качественную
                                        продукцию, но и высокий уровень обслуживания.</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                                <div className="count-box">
                                    <i className="icofont-users-alt-5"></i>
                                    <span data-toggle="counter-up">Забота</span>
                                    <p>
                                        Помимо опыта и знаний, каждый из них
                                        вкладывает частичку заботы о каждом клиенте. Arman Su - с улыбкой и заботой о Вас!</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>*/}

                <section id="why-us" className="why-us section-bg">
                    <div className="container-fluid" data-aos="fade-up">

                        <div className="row">

                            <div className="col-lg-5 align-items-stretch video-box"
                                 style={{'backgroundImage': "url(/img/bottle_1.jpg)"}} data-aos="zoom-in"
                                 data-aos-delay="100">
                            </div>

                            <div className="col-md-7 d-flex flex-column justify-content-center align-items-stretch">

                                <div className="content">
                                    <h3>Начинайте свой день правильно вместе с Arman Su!</h3>
                                    <p>Ни для кого не секрет, что утро рекомендуется начинать со стакана чистой воды,
                                        который будит Ваш организм, способствует нормализации обмена веществ и дает
                                        возможность организму подготовиться к завтраку.Выбирайте фильтрованную или бутилированную воду. А еще лучше, если
                                        Вы будете начинать свой день с глотка чистой артезианской воды Arman
                                        Su!
                                        Вкусно и полезно!</p>
                                </div>

                                <div className="accordion-list">
                                    <ul>
                                        <li>
                                            <a data-toggle="collapse" className="collapse"
                                               href="#accordion-list-1"><span>01</span> Команда <i className="bx bx-chevron-down icon-show"></i><i
                                                    className="bx bx-chevron-up icon-close"></i></a>
                                            <div id="accordion-list-1" className="collapse show"
                                                 data-parent=".accordion-list">
                                                <p>
                                                    Arman Su - это профессиональные специалисты,
                                                    которые знают толк в своем деле.
                                                </p>
                                            </div>
                                        </li>

                                        <li>
                                            <a data-toggle="collapse" href="#accordion-list-2"
                                               className="collapsed"><span>02</span> Доставка <i className="bx bx-chevron-down icon-show"></i><i
                                                    className="bx bx-chevron-up icon-close"></i></a>
                                            <div id="accordion-list-2" className="collapse"
                                                 data-parent=".accordion-list">
                                                <p>
                                                    В современных условиях скорость доставки играет
                                                    значительную роль.
                                                    Мы доставим артезианский "источник" быстро и надежно в офис или на дом!
                                                </p>
                                            </div>
                                        </li>

                                        <li>
                                            <a data-toggle="collapse" href="#accordion-list-3"
                                               className="collapsed"><span>03</span> Обслуживание <i className="bx bx-chevron-down icon-show"></i><i
                                                    className="bx bx-chevron-up icon-close"></i></a>
                                            <div id="accordion-list-3" className="collapse"
                                                 data-parent=".accordion-list">
                                                <p>
                                                    Компания Arman Su предоставляет не просто качественную
                                                    продукцию, но и высокий уровень обслуживания.
                                                </p>
                                            </div>
                                        </li>

                                        <li>
                                            <a data-toggle="collapse" href="#accordion-list-4"
                                               className="collapsed"><span>04</span> Забота <i className="bx bx-chevron-down icon-show"></i><i
                                                    className="bx bx-chevron-up icon-close"></i></a>
                                            <div id="accordion-list-4" className="collapse"
                                                 data-parent=".accordion-list">
                                                <p>
                                                    Помимо опыта и знаний, каждый из них
                                                    вкладывает частичку заботы о каждом клиенте. Arman Su - с улыбкой и заботой о Вас!
                                                </p>
                                            </div>
                                        </li>

                                    </ul>
                                </div>

                            </div>

                        </div>

                    </div>
                </section>

                <section id="services" className="services">
                    <div className="container" data-aos="fade-up">

                        <div className="section-title">
                            <h2>Товары</h2>
                            <p>Взгляните на наш прайс лист</p>
                        </div>

                        <div className="row">
                            <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in"
                                 data-aos-delay="100">
                                <div className="icon-box">
                                    <div className="icon"><i className="bx bxl-dribbble"></i></div>
                                    <h4><a href="">Вода, 19 литров</a></h4>
                                    <p>Заберите воду от Armansu себе домой. Armansu с заботой о близких</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0"
                                 data-aos="zoom-in"
                                 data-aos-delay="200">
                                <div className="icon-box">
                                    <div className="icon"><i className="bx bx-file"></i></div>
                                    <h4><a href="">Вода, 1 литр</a></h4>
                                    <p>Armansu, свежая вода объемом 1 литр, по цене ХХ идеально подойдет для поездки</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0"
                                 data-aos="zoom-in"
                                 data-aos-delay="300">
                                <div className="icon-box">
                                    <div className="icon"><i className="bx bx-tachometer"></i></div>
                                    <h4><a href="">Вода, 0.5 литров</a></h4>
                                    <p>Сделайте перерыв и утолите во время прогулки</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                <section id="contact" className="contact section-bg">
                    <div className="container" data-aos="fade-up">

                        <div className="section-title">
                            <h2>Контакты</h2>
                            <p>Свяжитесь с нами</p>
                        </div>

                        <div className="row">


                            {/*<div className="col-md-6">
                                <div className="info-box">
                                    <i className="bx bx-map"></i>
                                    <h3>Our Address</h3>
                                    <p>A108 Adam Street, New York, NY 535022</p>
                                </div>
                            </div>*/}
                            <div className="col-md-4">
                                <div className="info-box">
                                    <i className="bx bx-envelope"/>
                                    <h3>Email</h3>
                                    <p>contact@armansu.kz</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="info-box">
                                    <i className="bx bx-envelope"/>
                                    <h3>Email</h3>
                                    <p>contact@armansu.kz</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="info-box">
                                    <i className="bx bx-phone-call"/>
                                    <h3>Заказать по телефону</h3>
                                    <p>+7 747 918 8888</p>
                                </div>
                            </div>


                            {/*<div className="col-lg-6">
                                <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                                    <div className="form-row">
                                        <div className="col form-group">
                                            <input type="text" name="name" className="form-control" id="name"
                                                   placeholder="Your Name" data-rule="minlen:4"
                                                   data-msg="Please enter at least 4 chars"/>
                                            <div className="validate"></div>
                                        </div>
                                        <div className="col form-group">
                                            <input type="email" className="form-control" name="email" id="email"
                                                   placeholder="Your Email" data-rule="email"
                                                   data-msg="Please enter a valid email"/>
                                            <div className="validate"></div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="subject" id="subject"
                                               placeholder="Subject" data-rule="minlen:4"
                                               data-msg="Please enter at least 8 chars of subject"/>
                                        <div className="validate"></div>
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control" name="message" rows="5" data-rule="required"
                                                  data-msg="Please write something for us"
                                                  placeholder="Message"></textarea>
                                        <div className="validate"></div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="loading">Loading</div>
                                        <div className="error-message"></div>
                                        <div className="sent-message">Your message has been sent. Thank you!</div>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit">Send Message</button>
                                    </div>
                                </form>
                            </div>*/}

                        </div>

                    </div>
                </section>

            </div>

            <footer id="footer">
                {/*<div className="footer-top">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-4 col-md-6">
                                <div className="footer-info">
                                    <h3>Multi</h3>
                                    <p className="pb-3"><em>Qui repudiandae et eum dolores alias sed ea. Qui suscipit
                                        veniam
                                        excepturi quod.</em></p>
                                    <p>
                                        A108 Adam Street <br/>
                                        NY 535022, USA<br/><br/>
                                        <strong>Phone:</strong> +7 747 918 8888<br/>
                                        <strong>Email:</strong> info@example.com<br/>
                                    </p>
                                    <div className="social-links mt-3">
                                        <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                                        <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                                        <a href="https://www.instagram.com/armansu.kz/" className="instagram"><i className="bx bxl-instagram"></i></a>
                                        <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                                        <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-6 footer-links">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Home</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">О нас</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Services</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-2 col-md-6 footer-links">
                                <h4>Our Services</h4>
                                <ul>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Web Design</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Web Development</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Product Management</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Marketing</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Graphic Design</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>*/}

                <div className="container">
                    <div className="copyright">
                        &copy; Copyright <strong><span>Armansu</span></strong>. All Rights Reserved
                    </div>
                </div>
            </footer>

            <a href="#" className="back-to-top"><i className="icofont-simple-up"/></a>
        </>
    )
};

export default HomePage;