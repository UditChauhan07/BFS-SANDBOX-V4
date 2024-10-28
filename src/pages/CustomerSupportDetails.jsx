import { useSearchParams } from "react-router-dom";
import FullQuearyDetail from "../components/CustomerSupportPage/FullQuearyDetail";
import AppLayout from "../components/AppLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GetAuthData, getSupportDetails, getAttachment } from "../lib/store";
import LoaderV3 from "../components/loader/v3";
import { useLocation } from "react-router";
const CustomerSupportDetails = () => {
  const [searchParams] = useSearchParams();
  const [detailsData, setDetailsData] = useState({});
  const [attachmentUrls, setAttachmentUrls] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [isLoadingAttachments, setLoadingAttachments] = useState(false);
  const location = useLocation();
  const { id: detailsId } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await GetAuthData();
        let rawData = { key: user?.data?.x_access_token, caseId: detailsId };
        const details = await getSupportDetails({ rawData });
        details.salesRepName = user.Name;
        setDetailsData(details);
        await fetchAttachments(user.data.x_access_token, detailsId);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching support details:", error);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 3000);
  }, [detailsId]);

  const fetchAttachments = (token, caseId) => {
    if (!token || !caseId) return;
    setLoadingAttachments(true);

    getAttachment(token, caseId)
      .then((response) => {
        console.log(response, "ababsba");
        if (response) {
          const formattedAttachments = response.attachments.map(
            (attachment) => ({
              id: attachment.id,
              formattedId: `${attachment.id}.${attachment.name
                .split(".")
                .pop()
                .toLowerCase()}`,
              name: attachment.name,
            })
          );
          setAttachmentUrls(formattedAttachments);
        } else {
          console.warn("No attachments found in response");
          setAttachmentUrls([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching attachments:", error);
      })
      .finally(() => {
        setLoadingAttachments(false);
      });
  };

  useEffect(() => {
    if (detailsData?.user?.data?.x_access_token && detailsId) {
      fetchAttachments(detailsData.user.data.x_access_token, detailsId);
    }
  }, [detailsData, detailsId]);

  if (!isLoaded)
    return (
      <AppLayout>
        <LoaderV3 text={"Loading Support Details"} />
      </AppLayout>
    );

  return (
    <AppLayout>
      {isLoadingAttachments ? (
        <LoaderV3 text={"Loading Attachments..."} />
      ) : (
        <FullQuearyDetail data={detailsData} attachmentUrls={attachmentUrls} />
      )}
    </AppLayout>
  );
};

export default CustomerSupportDetails;
