export default {
  key: "guideFtp",
  updated: "15 October 2026",
  h1: "FTP and SFTP downloads with saved logins in Aynite Download Manager",
  lead: "Aynite Download Manager downloads from FTP and SFTP servers the same way it downloads from the web: paste the address, press Start, pause and resume as you like. Save the login once under Options and ADM uses it for every file from that server, on Windows and Linux.",
  sections: [
    {
      h2: "Save the login once",
      steps: [
        ["Open Options, then Proxy and Logins", "The Saved site logins table has a row per server: Host, User name, Password. It is used for FTP, SFTP and password-protected web downloads."],
        ["Add the server", "Enter the host name exactly as it appears in the address, for example files.example.com, with the user name and password. Passwords are stored encrypted on your computer: with Windows' own protection on Windows, and with a key file in your profile on Linux."],
        ["Download", "Paste an ftp:// or sftp:// address into Add URL, or copy it with the clipboard watch turned on in Options. ADM finds the matching login by host name and starts the download."],
      ],
    },
    {
      h2: "Anonymous FTP",
      p: [
        "Servers that allow anonymous access need no saved login: ADM signs in as anonymous automatically, which is how public mirrors of Linux distributions and software archives work.",
      ],
    },
    {
      h2: "Pause, resume and limits",
      p: [
        "FTP and SFTP downloads can be paused and resumed where the server allows it, carry on by themselves after a dropped connection, follow the [speed limits](key:guideSpeed) and the [scheduler](key:guideSchedule), and are sorted into categories like any other file. Large transfers from a server you own are the typical case: queue them for the night and let ADM shut the PC down after.",
      ],
    },
    {
      h2: "Password-protected web downloads",
      p: [
        "The same table serves web servers that ask for a user name and password. Add the host once, then download from it as usual.",
      ],
    },
  ],
  faq: [
    ["Does ADM support SFTP as well as FTP?", "Yes, both, with saved logins for each."],
    ["Where are the passwords kept?", "On your computer only, encrypted: with Windows' data protection on Windows, and with a key file in your profile on Linux. They are never sent to AyniteSoft."],
    ["Can I use a proxy?", "Yes. Options, then Proxy and Logins, takes an HTTP or SOCKS5 proxy address, used for web and video downloads."],
    ["Can I download a whole folder from a server?", "Paste the folder's address into the Grabber: it lists the files, and you tick what you want. [How the Grabber works](key:guideGrab)."],
  ],
  related: ["guideSpeed", "guideGrab", "guideChecksum", "guides"],
};
