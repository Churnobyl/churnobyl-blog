export const copyToClipboard = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      alert("현재 URL이 클립보드에 복사되었습니다.");
    } catch (err) {
      console.error("URL 복사에 실패했습니다.", err);
    }
  };