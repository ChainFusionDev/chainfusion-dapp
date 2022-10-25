import Layout from '@components/Layout';
import SlashingProposalModal from '@components/Modals/SlashingProposalModal';
import ReactTooltip from 'react-tooltip';
import React from 'react';

const Slashing = () => {
  const [showSlashingProposalModal, setShowSlashingProposalModal] = React.useState(false);

  return (
    <Layout module="slashing" title="Slashing" description="Create, view and vote for validator slashing">
      <section className="section-page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <a
                href="#"
                className="btn-blue-light action-btn mt-2 mb-3 float-right"
                onClick={() => setShowSlashingProposalModal(true)}
              >
                <i className="fa-light fa-circle-plus"></i> Сreate Proposal
              </a>
            </div>

            <div className="col-12">
              <div className="slashing-block">
                <div className="vote-block">
                  <span className="vote-btn voted-active">
                    <i className="fa-light fa-hand"></i>
                  </span>
                </div>
                <div className="slashing-info">
                  <span className="slashing-status status-pending">Pending</span>
                  <div className="slashing-text text-break">
                    <strong>Slashing:&nbsp;</strong>
                    <p>Attempted to sign non-existing transaction</p>
                  </div>
                  <div className="slashing-adress text-break">
                    <strong>Address:&nbsp;</strong>
                    <a href="https://explorer.chainfusion.org/" target="_blank" rel="noreferrer">
                      0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                    </a>
                    <span className="copy-token-icon" data-toggle="tooltip" data-tip data-for="transaction-copy"></span>
                  </div>
                  <div className="slashing-votes">
                    <strong>Votes:</strong> <span>4 / 15</span>
                  </div>
                  <div className="slashing-date">
                    <strong>Created at:&nbsp;</strong>
                    <i className="fa-light fa-calendar-plus"></i> 12.10.2022 - 14:36
                  </div>
                  <div className="slashing-timer">
                    <strong>Expires in:&nbsp;</strong>
                    <i className="fa-light fa-clock"></i> 8 days
                  </div>
                  <span className="slashing-vote-label">
                    <i className="fa-light fa-check"></i> You have voted
                  </span>
                </div>
              </div>

              <div className="slashing-block">
                <div className="vote-block">
                  <span className="vote-btn voted-active">
                    <i className="fa-light fa-hand"></i>
                  </span>
                </div>
                <div className="slashing-info">
                  <span className="slashing-status status-executed">Executed</span>
                  <div className="slashing-text text-break">
                    <strong>Ban:&nbsp;</strong>
                    <p>Does not participate in consensus</p>
                  </div>
                  <div className="slashing-adress text-break">
                    <strong>Address:&nbsp;</strong>
                    <a href="https://explorer.chainfusion.org/" target="_blank" rel="noreferrer">
                      0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                    </a>
                    <span className="copy-token-icon" data-toggle="tooltip" data-tip data-for="transaction-copy"></span>
                  </div>
                  <div className="slashing-votes">
                    <strong>Votes:</strong> <span>10 / 15</span>
                  </div>
                  <div className="slashing-date">
                    <strong>Created at:&nbsp;</strong>
                    <i className="fa-light fa-calendar-plus"></i> 12.10.2022 - 14:36
                  </div>
                  <div className="slashing-timer">
                    <strong>Executed at:&nbsp;</strong>
                    <i className="fa-light fa-clock"></i> 15.02.2022 - 17:35:35
                  </div>
                  <span className="slashing-vote-label">
                    <i className="fa-light fa-check"></i> You have voted
                  </span>
                </div>
              </div>

              <div className="slashing-block">
                <div className="vote-block">
                  <span className="vote-btn">
                    <i className="fa-light fa-hand"></i>
                  </span>
                </div>
                <div className="slashing-info">
                  <span className="slashing-status status-expired">Expired</span>
                  <div className="slashing-text text-break">
                    <strong>Slashing:&nbsp;</strong>
                    <p>Does not participate in consensus</p>
                  </div>
                  <div className="slashing-adress text-break">
                    <strong>Address:&nbsp;</strong>
                    <a href="https://explorer.chainfusion.org/" target="_blank" rel="noreferrer">
                      0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                    </a>
                    <span className="copy-token-icon" data-toggle="tooltip" data-tip data-for="transaction-copy"></span>
                  </div>
                  <div className="slashing-votes">
                    <strong>Votes:</strong> <span>3 / 15</span>
                  </div>
                  <div className="slashing-date">
                    <strong>Created at:&nbsp;</strong>
                    <i className="fa-light fa-calendar-plus"></i> 12.10.2022 - 14:36
                  </div>
                  <div className="slashing-timer">
                    <strong>Expired at:&nbsp;</strong>
                    <i className="fa-light fa-clock"></i> 15.02.2022 - 17:35:35
                  </div>
                </div>
              </div>

              <div className="slashing-block">
                <div className="vote-block">
                  <span className="vote-btn voted-active">
                    <i className="fa-light fa-hand"></i>
                  </span>
                </div>
                <div className="slashing-info">
                  <span className="slashing-status status-executed">Executed</span>
                  <div className="slashing-text text-break">
                    <strong>Ban:&nbsp;</strong>
                    <p>Does not participate in consensus</p>
                  </div>
                  <div className="slashing-adress text-break">
                    <strong>Address:&nbsp;</strong>
                    <a href="https://explorer.chainfusion.org/" target="_blank" rel="noreferrer">
                      0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                    </a>
                    <span className="copy-token-icon" data-toggle="tooltip" data-tip data-for="transaction-copy"></span>
                  </div>
                  <div className="slashing-votes">
                    <strong>Votes:</strong> <span>4 / 15</span>
                  </div>
                  <div className="slashing-date">
                    <strong>Created at:&nbsp;</strong>
                    <i className="fa-light fa-calendar-plus"></i> 12.10.2022 - 14:36
                  </div>
                  <div className="slashing-timer">
                    <strong>Executed at:&nbsp;</strong>
                    <i className="fa-light fa-clock"></i> 15.02.2022 - 17:35:35
                  </div>
                  <span className="slashing-vote-label">
                    <i className="fa-light fa-check"></i> You have voted
                  </span>
                </div>
              </div>

              <div className="slashing-block">
                <div className="vote-block">
                  <span className="vote-btn">
                    <i className="fa-light fa-hand"></i>
                  </span>
                </div>
                <div className="slashing-info">
                  <span className="slashing-status status-expired">Expired</span>
                  <div className="slashing-text text-break">
                    <strong>Slashing:&nbsp;</strong>
                    <p>Does not participate in consensus</p>
                  </div>
                  <div className="slashing-adress text-break">
                    <strong>Address:&nbsp;</strong>
                    <a href="https://explorer.chainfusion.org/" target="_blank" rel="noreferrer">
                      0x0661F0297bC6234d8b31782Cd1926EC101dF2d27
                    </a>
                    <span className="copy-token-icon" data-toggle="tooltip" data-tip data-for="transaction-copy"></span>
                  </div>
                  <div className="slashing-votes">
                    <strong>Votes:</strong> <span>3 / 15</span>
                  </div>
                  <div className="slashing-date">
                    <strong>Created at:&nbsp;</strong>
                    <i className="fa-light fa-calendar-plus"></i> 12.10.2022 - 14:36
                  </div>
                  <div className="slashing-timer">
                    <strong>Expired at:&nbsp;</strong>
                    <i className="fa-light fa-clock"></i> 15.02.2022 - 17:35:35
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
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
      </section>

      <SlashingProposalModal show={showSlashingProposalModal} close={() => setShowSlashingProposalModal(false)} />

      <ReactTooltip
        id="transaction-copy"
        className="standart-tooltip"
        type="light"
        effect="solid"
        offset={{ top: 0, right: 0, left: 0, bottom: 0 }}
        border={true}
      >
        Copy to clipboard
      </ReactTooltip>
    </Layout>
  );
};

export default Slashing;
