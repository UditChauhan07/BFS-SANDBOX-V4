
import React, { useState } from "react";
import styles from "./page.module.css";
import AppLayout from "../components/AppLayout";
import { productGuides } from "../lib/store";
import ModalPage from "../components/Modal UI";
import { CloseButton } from "../lib/svg";
import { MdOutlineDownload } from "react-icons/md";
import ReactPlayer from 'react-player';
import { pdfjs, Document, Page } from 'react-pdf';
import { ReactPDF, PDFViewer } from '@react-pdf/renderer';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Set PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

const HelpSection = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLink, setCurrentLink] = useState('');
    const [currentType, setCurrentType] = useState('');
    const [isDownloadConfirmOpen, setIsDownloadConfirmOpen] = useState(false);

    const guides = Object.values(productGuides);

    const openModal = (link, type) => {
        setCurrentLink(link);
        setCurrentType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentLink('');
        setCurrentType('');
    };

    const openDownloadConfirm = () => {
        setIsDownloadConfirmOpen(true);
    };

    const closeDownloadConfirm = () => {
        setIsDownloadConfirmOpen(false);
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(currentLink);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${currentType === 'Video' ? 'video.mp4' : 'document.pdf'}`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <AppLayout>
            {isModalOpen &&
                <ModalPage
                    open
                    content={
                        <div className="d-flex flex-column gap-3" style={{ width: '75vw' }}>
                            <div style={{
                                position: 'sticky',
                                top: '0',
                                background: '#fff',
                                zIndex: 1,
                                padding: '15px',
                                borderBottom: '1px solid #ddd',


                            }}>
                                <div className="d-flex align-items-center justify-content-between" style={{ minWidth: '75vw' }}>
                                    <h1 className="font-[Montserrat-500] text-[22px] tracking-[2.20px] m-0 p-0">
                                        How to Access BFSG Retailer Portal {currentType}
                                    </h1>
                                    <div className="d-flex justify-content-end mt-2">
                                        <button
                                            className={styles.downloadButton}
                                            onClick={openDownloadConfirm}
                                        >
                                            <MdOutlineDownload size={20} />
                                            <small style={{ fontSize: '10px', letterSpacing: '0.5px', marginLeft: "-15px", textTransform: 'uppercase' }}>Download</small>
                                        </button>
                                    </div>
                                    <button type="button" onClick={closeModal} >
                                        <CloseButton />
                                    </button>
                                </div>
                                <hr />
                            </div>
                            {currentType === 'Video' ? (
                                <ReactPlayer
                                    url={currentLink}
                                    width="100%"
                                    height="400px"
                                    overflow="hidden"
                                    controls

                                />
                            ) : (


                                <iframe

                                    src={currentLink}
                                    width="100%" height="400px" overflow="hidden"></iframe>)}
                                    {isDownloadConfirmOpen &&
                                        <div className={styles.modalOverlay}>
                                            <div className={styles.modalContent}>
                                                <h2>Download {currentType.toLowerCase()}</h2>
                                                <p>The download is for {currentType.toLowerCase()} only.</p>
                                                <div className={styles.modalActions}>
                                                    <button onClick={handleDownload} className={styles.confirmButton}>Download</button>
                                                    <button onClick={closeDownloadConfirm} className={styles.cancelButton}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                            }
                        </div>
                    }
                />
            }

            <div className="container p-0">
                <div className="row p-0 m-0 d-flex flex-column justify-content-around align-items-center col-12">
                    <div className="row d-flex flex-column justify-content-around align-items-center lg:min-h-[300px] xl:min-h-[400px]">
                        <div className={`d-flex p-3 ${styles.tableBoundary} mb-5 mt-5`}>
                            <div
                                style={{ maxHeight: "73vh", minHeight: "40vh", overflow: "auto", width: '100%' }}
                            >
                                <table id="productGuidesTable" className="table table-responsive" style={{ minHeight: "150px" }}>
                                    <thead>
                                        <tr>
                                            <th className={`${styles.month} ${styles.stickyFirstColumnHeading}`} style={{ minWidth: "150px" }}>
                                                Name
                                            </th>
                                            <th className={`${styles.month} ${styles.stickyFirstColumnHeading}`} style={{ minWidth: "150px" }}>
                                                File Name
                                            </th>
                                            <th className={`${styles.month} ${styles.stickyFirstColumnHeading}`} style={{ minWidth: "150px" }}>
                                                Type
                                            </th>
                                            <th className={`${styles.month} ${styles.stickyFirstColumnHeading}`} style={{ minWidth: "150px" }}>
                                                Download link
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {guides.map((guide, index) => (
                                            <tr key={index}>
                                                <td className={`${styles.td}`}>
                                                    {guide.Categoryname}
                                                </td>
                                                <td className={`${styles.td}`}>
                                                    {guide.filename}
                                                </td>
                                                <td className={`${styles.td}`}>
                                                    {guide.Type}
                                                </td>
                                                <td className={`${styles.td}`}>
                                                    <button
                                                        className={styles.btn}
                                                        onClick={() => openModal(guide.Link, guide.Type)}
                                                    >
                                                        {guide.OriginalFileName}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default HelpSection;

