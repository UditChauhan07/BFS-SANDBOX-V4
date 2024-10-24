import React, { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";
import AppLayout from "../components/AppLayout";
import { originAPi, productGuides } from "../lib/store";
import ModalPage from "../components/Modal UI";
import { IoIosCloseCircleOutline, IoMdDocument } from "react-icons/io"
import { MdOutlineDownload } from "react-icons/md";
import FilterSearch from "../components/FilterSearch";
import Loading from "../components/Loading";
import { MdSlideshow } from "react-icons/md";
import VideoPlayer from "../components/VideoPlayer";
// import { ClipLoader } from "react-spinners"; // Import the spinner component

const HelpSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState('');
  const [currentType, setCurrentType] = useState('');
  const [currentFileName, setCurrentFileName] = useState('');
  const [isDownloadConfirmOpen, setIsDownloadConfirmOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false); // State for spinner
  const [searchTerm, setSearchTerm] = useState("");

  const modalRef = useRef(null);

  const guides = Object.values(productGuides);

  const openModal = (link, type, fileName) => {
    setCurrentLink(link);
    setCurrentType(type);
    setCurrentFileName(fileName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentLink('');
    setCurrentType('');
    setCurrentFileName('');
  };

  const openDownloadConfirm = () => {
    setIsDownloadConfirmOpen(true);
  };

  const closeDownloadConfirm = () => {
    setIsDownloadConfirmOpen(false);
  };

  const handleDownload = () => {
    setIsDownloading(true); // Start the spinner
    const a = document.createElement('a');
    a.href = `${originAPi}/api/download?fileName=${currentLink}`;
    // a.target = '_blank'
    a.click();
    setIsDownloading(false); // Stop the spinner
    closeDownloadConfirm(); // Close the download confirmation modal
  };
  const filteredGuides = guides.filter((guide) =>
    guide.Categoryname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <AppLayout
      filterNodes={
        <>
          <FilterSearch
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder={"Search by Name"}
            minWidth={"130px"}
            className={styles.searchInput}
          />
        </>
      }
    >
      {isModalOpen &&
        <ModalPage
          open
          content={
            <div ref={modalRef} className="d-flex flex-column gap-3" style={{ width: '75vw', maxWidth: '800px' }}>
              <div style={{
                position: 'sticky',
                top: '0',
                background: '#fff',
                zIndex: 1,
                padding: "9px 8px 9px 10px",
                borderBottom: '1px solid #ddd',
              }}>
                <div className="d-flex align-items-center justify-content-between " style={{ marginTop: "-40px", marginLeft: '-20px' }}>
                  <div className="d-flex justify-content-end mt-2 gap-3">
                    <h1 className="font-[Montserrat-500] text-[22px] tracking-[2.20px] m-0 p-0 text-start" style={{ fontSize: '18px' }}>
                      {currentFileName}
                    </h1>


                  </div>
                  <button
                    className={styles.downloadButton}
                    onClick={openDownloadConfirm}
                  >
                    <div className="d-flex align-items-center justify-content-between gap-1" >
                      <MdOutlineDownload size={16} />Download
                    </div>
                  </button>

                  <button type="button" onClick={closeModal} style={{ marginTop: "-3px", width: "15px", height: "20px" }} >
                    <IoIosCloseCircleOutline size={35} />
                  </button>
                </div>
              </div>
              {currentType === 'Video' ? (
                <VideoPlayer src={`${originAPi}/${currentLink}`} />
              ) : (
                <iframe
                  src={`${originAPi}/${currentLink}`}
                  style={{ width: "104%", height: "400px", marginLeft: "-20px", overflow: "hidden" }}></iframe>
              )}
              {isDownloadConfirmOpen &&
                <div className={styles.modalOverlay}>
                  <div className={styles.modalContent}>
                    <p style={{ marginTop: '20px' }}>Are you sure you want to download?</p>
                    <div className={styles.modalActions}>
                      <button onClick={() => handleDownload()} className={styles.confirmButton}>YES</button>
                      <button onClick={closeDownloadConfirm} className={styles.cancelButton}>NO</button>
                    </div>
                    {/* {isDownloading && (
                      <div className={styles.spinnerOverlay}>
                        <Loading color={" #fff"} loading={true} size={50} />
                      </div>
                    )}  */}
                    {isDownloading && (
                      <div className={styles.spinnerOverlay}>
                        <Loading color={" #fff"} loading={true} size={50} />
                        <div className={styles.progressBarContainer}>
                          <div id="downloadProgress" className={styles.progressBar}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              }
            </div>
          }
        />
      }
      <div className="container-fluid">
        <div className="row p-0 m-0 d-flex flex-column justify-content-around align-items-center col-12">
          <div className="row d-flex flex-column justify-content-around align-items-center">
            <h1 className={styles.TOPName}>Help Center</h1>
            <div className={`d-flex p-3 ${styles.tableBoundary} mb-5 mt-3`} style={{ overflowX: "auto", maxWidth: "100%" }}>
              {guides.length ? (
                <div style={{ maxHeight: "73vh", minHeight: "40vh", width: '100%', overflowY: "auto", overflowX: "auto" }}>
                  <table id="productGuidesTable" className="table table-responsive" style={{ minHeight: "150px", width: '100%', tableLayout: "auto", wordBreak: "break-word" }}>
                    <thead>
                      <tr>
                        <th className={`${styles.month} ${styles.stickyFirstColumnHeading}`} style={{ minWidth: "150px" }}>
                          Category Name
                        </th>
                        <th className={`${styles.month} ${styles.stickyFirstColumnHeading}`} style={{ minWidth: "150px" }}>
                          File Name
                        </th>
                        <th className={`${styles.month} ${styles.stickyFirstColumnHeading}`} style={{ minWidth: "150px" }}>
                          Show View
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGuides.map((guide, index) => (
                        <tr key={index}>
                          <td className={styles.td}>
                            {guide.Categoryname}
                          </td>
                          <td className={styles.td}>
                            {guide.filename}
                          </td>
                          <td className={styles.td}>
                            <button
                              className={styles.btn}
                              onClick={() => openModal(guide.Link, guide.Type, guide.filename)}
                            >
                              <div className="d-flex align-items-center justify-content-between gap-1" >
                                {guide.Type === "Video" ? <MdSlideshow size={16} /> : <IoMdDocument />} View
                              </div>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <Loading height={"70vh"} />
              )}
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HelpSection;
