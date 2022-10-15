import Layout from '@components/Layout';
import InputCFNModal from '@components/Modals/InputCFNModal';
import React from 'react';

const Staking = () => {
  const [showIncreaseStakeModal, setShowIncreaseStakeModal] = React.useState(false);
  const [showAnnounceWithdrawalModal, setShowAnnounceWithdrawalModal] = React.useState(false);

  return (
    <Layout module="staking" title="Staking" description="Stake CFN to validator transfers and receive rewards">
      <section className="section-page" style={{ paddingBottom: '100px' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-8 col-md-8 col-lg-4 col-xl-4 mx-auto">
              <div className="validator-info mb-4">
                <img
                  src="img/avatar/validator.svg"
                  alt="Validator"
                  className="img-fluid d-block mx-auto validator-avatar"
                />
                <div className="status-validator active-validator">
                  <span>Validator</span>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="current-stake-block">
                      <div className="title-validator">Current stake</div>
                      <div className="number-block">156</div>
                    </div>
                  </div>
                  <div className="col-sm-6 pr-sm-1">
                    <div className="announced-withdrawal-block">
                      <div className="title-validator">Announced Withdrawal</div>
                      <div className="number-block">12</div>
                    </div>
                  </div>
                  <div className="col-sm-6 pl-sm-1">
                    <div className="withdrawal-time-block">
                      <div className="title-validator">Withdrawal Time</div>
                      <div className="time-withdrawal">
                        <span>13:23:11 - 21.10.22</span>
                      </div>
                    </div>
                  </div>
                </div>

                <a href="#" className="btn-blue" onClick={() => setShowIncreaseStakeModal(true)}>
                  <i className="fa-light fa-circle-arrow-up"></i> Increase Stake
                </a>
                <a href="#" className="btn-blue-light mt-2" onClick={() => setShowAnnounceWithdrawalModal(true)}>
                  <i className="fa-light fa-message-arrow-down"></i> Announce Withdrawal
                </a>
                <a href="#" className="btn-blue-light mt-2">
                  <i className="fa-light fa-circle-arrow-down"></i> Withdraw Stake
                </a>
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
              <div className="table-block">
                <div className="staking-table-title d-flex">
                  <div className="rank pr-2">Rank</div>
                  <div className="wallet pl-4 flex-grow-1">Account</div>
                  <div className="amount pl-5 pr-4">Stake</div>
                </div>

                <div className="staking-table-tr d-flex">
                  <div className="rank pr-md-3">
                    <p className="d-block d-sm-block d-md-none">Rank:</p>1
                  </div>
                  <div className="wallet pl-md-4 flex-grow-1">
                    <p className="d-block d-sm-block d-md-none">Account:</p>
                    0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                  </div>
                  <div className="amount pl-md-4 pr-md-6">
                    <p className="d-block d-sm-block d-md-none">Stake:</p>
                    550
                  </div>
                </div>

                <div className="staking-table-tr d-flex">
                  <div className="rank pr-md-3">
                    <p className="d-block d-sm-block d-md-none">Rank:</p>2
                  </div>
                  <div className="wallet pl-md-4 flex-grow-1">
                    <p className="d-block d-sm-block d-md-none">Account:</p>
                    0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                  </div>
                  <div className="amount pl-md-4 pr-md-6">
                    <p className="d-block d-sm-block d-md-none">Stake:</p>
                    523
                  </div>
                </div>

                <div className="staking-table-tr d-flex">
                  <div className="rank pr-md-3">
                    <p className="d-block d-sm-block d-md-none">Rank:</p>3
                  </div>
                  <div className="wallet pl-md-4 flex-grow-1">
                    <p className="d-block d-sm-block d-md-none">Account:</p>
                    0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                  </div>
                  <div className="amount pl-md-4 pr-md-6">
                    <p className="d-block d-sm-block d-md-none">Stake:</p>
                    476
                  </div>
                </div>

                <div className="staking-table-tr d-flex">
                  <div className="rank pr-md-3">
                    <p className="d-block d-sm-block d-md-none">Rank:</p>4
                  </div>
                  <div className="wallet pl-md-4 flex-grow-1">
                    <p className="d-block d-sm-block d-md-none">Account:</p>
                    0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                  </div>
                  <div className="amount pl-md-4 pr-md-6">
                    <p className="d-block d-sm-block d-md-none">Stake:</p>
                    359
                  </div>
                </div>

                <div className="staking-table-tr d-flex">
                  <div className="rank pr-md-3">
                    <p className="d-block d-sm-block d-md-none">Rank:</p>5
                  </div>
                  <div className="wallet pl-md-4 flex-grow-1">
                    <p className="d-block d-sm-block d-md-none">Account:</p>
                    0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                  </div>
                  <div className="amount pl-md-4 pr-md-6">
                    <p className="d-block d-sm-block d-md-none">Stake:</p>
                    322
                  </div>
                </div>

                <div className="staking-table-tr d-flex">
                  <div className="rank pr-md-3">
                    <p className="d-block d-sm-block d-md-none">Rank:</p>6
                  </div>
                  <div className="wallet pl-md-4 flex-grow-1">
                    <p className="d-block d-sm-block d-md-none">Account:</p>
                    0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                  </div>
                  <div className="amount pl-md-4 pr-md-6">
                    <p className="d-block d-sm-block d-md-none">Stake:</p>
                    301
                  </div>
                </div>

                <div className="staking-table-tr d-flex">
                  <div className="rank pr-md-3">
                    <p className="d-block d-sm-block d-md-none">Rank:</p>7
                  </div>
                  <div className="wallet pl-md-4 flex-grow-1">
                    <p className="d-block d-sm-block d-md-none">Account:</p>
                    0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                  </div>
                  <div className="amount pl-md-4 pr-md-6">
                    <p className="d-block d-sm-block d-md-none">Stake:</p>
                    205
                  </div>
                </div>

                <div className="staking-table-tr d-flex">
                  <div className="rank pr-md-3">
                    <p className="d-block d-sm-block d-md-none">Rank:</p>8
                  </div>
                  <div className="wallet pl-md-4 flex-grow-1">
                    <p className="d-block d-sm-block d-md-none">Account:</p>
                    0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                  </div>
                  <div className="amount pl-md-4 pr-md-6">
                    <p className="d-block d-sm-block d-md-none">Stake:</p>
                    184
                  </div>
                </div>

                <div className="staking-table-tr d-flex">
                  <div className="rank pr-md-3">
                    <p className="d-block d-sm-block d-md-none">Rank:</p>9
                  </div>
                  <div className="wallet pl-md-4 flex-grow-1">
                    <p className="d-block d-sm-block d-md-none">Account:</p>
                    0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                  </div>
                  <div className="amount pl-md-4 pr-md-6">
                    <p className="d-block d-sm-block d-md-none">Stake:</p>
                    173
                  </div>
                </div>

                <div className="staking-table-tr d-flex">
                  <div className="rank pr-md-3">
                    <p className="d-block d-sm-block d-md-none">Rank:</p>
                    10
                  </div>
                  <div className="wallet pl-md-4 flex-grow-1">
                    <p className="d-block d-sm-block d-md-none">Account:</p>
                    0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                  </div>
                  <div className="amount pl-md-4 pr-md-6">
                    <p className="d-block d-sm-block d-md-none">Stake:</p>
                    168
                  </div>
                </div>

                <div className="staking-table-tr d-flex">
                  <div className="rank pr-md-3">
                    <p className="d-block d-sm-block d-md-none">Rank:</p>
                    11
                  </div>
                  <div className="wallet pl-md-4 flex-grow-1">
                    <p className="d-block d-sm-block d-md-none">Account:</p>
                    0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                  </div>
                  <div className="amount pl-md-4 pr-md-6">
                    <p className="d-block d-sm-block d-md-none">Stake:</p>
                    167
                  </div>
                </div>

                <div className="staking-table-tr d-flex">
                  <div className="rank pr-md-3">
                    <p className="d-block d-sm-block d-md-none">Rank:</p>
                    12
                  </div>
                  <div className="wallet pl-md-4 flex-grow-1">
                    <p className="d-block d-sm-block d-md-none">Account:</p>
                    0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                  </div>
                  <div className="amount pl-md-4 pr-md-6">
                    <p className="d-block d-sm-block d-md-none">Stake:</p>
                    140
                  </div>
                </div>

                <div className="staking-table-tr d-flex">
                  <div className="rank pr-md-3">
                    <p className="d-block d-sm-block d-md-none">Rank:</p>
                    13
                  </div>
                  <div className="wallet pl-md-4 flex-grow-1">
                    <p className="d-block d-sm-block d-md-none">Account:</p>
                    0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                  </div>
                  <div className="amount pl-md-4 pr-md-6">
                    <p className="d-block d-sm-block d-md-none">Stake:</p>
                    135
                  </div>
                </div>

                <div className="staking-table-tr d-flex">
                  <div className="rank pr-md-3">
                    <p className="d-block d-sm-block d-md-none">Rank:</p>
                    14
                  </div>
                  <div className="wallet pl-md-4 flex-grow-1">
                    <p className="d-block d-sm-block d-md-none">Account:</p>
                    0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                  </div>
                  <div className="amount pl-md-4 pr-md-6">
                    <p className="d-block d-sm-block d-md-none">Stake:</p>
                    131
                  </div>
                </div>

                <div className="staking-table-tr d-flex">
                  <div className="rank pr-md-3">
                    <p className="d-block d-sm-block d-md-none">Rank:</p>
                    15
                  </div>
                  <div className="wallet pl-md-4 flex-grow-1">
                    <p className="d-block d-sm-block d-md-none">Account:</p>
                    0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                  </div>
                  <div className="amount pl-md-4 pr-md-6">
                    <p className="d-block d-sm-block d-md-none">Stake:</p>
                    109
                  </div>
                </div>

                <div className="pagination-block d-flex justify-content-between">
                  <ul className="pagination-nav">
                    <li className="prev-btn">
                      <i className="fa-regular fa-chevron-left"></i>
                    </li>
                    <li className="pagintaion-number">1</li>
                    <li className="pagintaion-number active">2</li>
                    <li className="pagintaion-number">3</li>
                    <li className="pagintaion-dot">...</li>
                    <li className="pagintaion-number">18</li>
                    <li className="next-btn">
                      <i className="fa-regular fa-chevron-right"></i>
                    </li>
                  </ul>
                  <div className="count-page-pagination d-flex float-right">
                    Page <span>2</span> of <span>18</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InputCFNModal
        show={showIncreaseStakeModal}
        maxValue={123}
        maxValueText="Available to stake"
        title="Increase Stake"
        buttonText="Stake"
        close={() => setShowIncreaseStakeModal(false)}
      />

      <InputCFNModal
        show={showAnnounceWithdrawalModal}
        maxValue={16}
        maxValueText="Available to announce"
        title="Announce Withdrawal"
        buttonText="Announce"
        close={() => setShowAnnounceWithdrawalModal(false)}
      />
    </Layout>
  );
};

export default Staking;
