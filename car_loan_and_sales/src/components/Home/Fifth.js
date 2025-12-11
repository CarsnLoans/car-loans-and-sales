import React from "react";

const Fifth = () => {
  return (
    <>
      <h1 className="text-danger m-5 pt-5 text-center">
        Give a missed call +91 9686-870-536
      </h1>
      <div className="p-md-5 mx-md-5 mb-5">
        <h3>FAQ's?</h3>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button text-uppercase fw-bold text-secondary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                What are the different types of loans I can avail?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                We can help you avail loan to purchase a used car or new car. We
                also help you to get a loan against your existing car. Loan
                against your car helps you get cash in your hand to fulfill any
                financial need.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed text-uppercase fw-bold text-secondary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                What are the benefits of applying for loan through CLS?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                GetFin Tech is the trusted partner of all leading financiers of
                India. We provide you with the best auto loan services that are
                quick and hassle-free. With over 10 lending partners, you can
                compare and choose from different offers from our financier
                partners. We also provide with door-step assistance to give you
                a great experience.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed text-uppercase fw-bold text-secondary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                How much loan can I get?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                The maximum amount of loan you can get is different for
                different banks. GetFin can help you avail 95% loan on your used
                car and new car purchase. With a top-up loan, you can get up to
                100% loan on your car’s current market value.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button collapsed text-uppercase fw-bold text-secondary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                Do I need to give collateral to get a loan?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                No, you don’t need to give collateral. But you will have to
                hypothecate the car in the banks name and an endorsement made in
                the Registration Certificate (RC) book of the vehicle.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button
                className="accordion-button collapsed text-uppercase fw-bold text-secondary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                How long does it take to process the loan?
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="headingFive"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                If all documents required are received in order, your process
                moves smoothly. You need to submit some documents like salary
                slips, tax returns, proof of residence, bank statements, etc.
                The processing time takes between 2 to 7 days
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fifth;
