export default {
  key: "helpSmartscreen",
  updated: "14 October 2026",
  h1: "\"Windows protected your PC\" when installing Aynite Download Manager",
  lead: "Windows shows a blue SmartScreen notice when you run an installer it has not seen often before, or that is not signed with a certificate it recognises. It is a warning about reputation, not a finding about the file. Here is what it means for the ADM installer, how to check the file yourself, and how to continue.",
  sections: [
    {
      h2: "What the notice means",
      p: [
        "SmartScreen keeps a list of installers that many Windows users have run without trouble, and of publishers with a certificate it trusts. A new program is on neither list, so every PC that meets its installer for the first time shows \"Windows protected your PC\" with a More info link. The ADM installer is not yet signed with a certificate that Windows recognises, which is why you see the notice on a PC that has not run it before. The notice says nothing about the file being harmful; Windows Security still scans the file as usual.",
      ],
    },
    {
      h2: "Check the file before you continue",
      steps: [
        ["Note the fingerprint on the download page", "On the [download section](key:home#download), open Verify this file. It shows the SHA-256 fingerprint of the current installer: a long string of letters and digits that is unique to that exact file."],
        ["Compute the fingerprint of the file you have", "Open PowerShell in your Downloads folder (right-click the folder, Open in Terminal) and run: Get-FileHash .\\ADM-Setup-<version>.exe. Windows prints the file's SHA-256."],
        ["Compare the two", "If they match, the file is exactly what AyniteSoft published and it has not been altered on the way. If they differ, delete the file and download it again from this site only."],
      ],
    },
    {
      h2: "Continue the installation",
      p: [
        "In the SmartScreen notice click More info, then Run anyway. The installer starts, puts ADM in your user account's Programs folder without an administrator password, and offers the browser add-on on first start. [The Windows page](key:windows) has the rest of the steps.",
      ],
    },
    {
      h2: "Why not just sign the installer?",
      p: [
        "A certificate that SmartScreen trusts at once is issued only to a verified company and costs money every year; it is on AyniteSoft's list. Until then, the fingerprint check above gives you the same certainty that the signature would: that the file is exactly the one published here.",
      ],
    },
  ],
  faq: [
    ["Is the ADM installer safe?", "Yes, when it comes from this site and its SHA-256 matches the one shown on the download section. The installer contains ADM and nothing else: no ads, no bundled extras."],
    ["Will the notice appear every time?", "Only until the installer has built a reputation on SmartScreen, or until the installer is signed with a recognised certificate. Updates installed from inside ADM run silently and do not show it."],
    ["Does Windows Security flag ADM?", "No. The SmartScreen notice is about reputation; Windows Security's scan of the file is separate and passes."],
    ["Why does the download section show a fingerprint at all?", "So anyone can check the file independently of any signature or store. ADM does the same for your own downloads: every finished file shows its SHA-256 and MD5. [Verify a download](key:guideChecksum)."],
  ],
  related: ["windows", "guideChecksum", "help"],
};
