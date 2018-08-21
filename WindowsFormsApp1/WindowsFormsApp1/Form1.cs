using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO.Ports;
using System.Security.Permissions;
using Microsoft.Win32;
using System.Net;
using System.IO;
using System.Threading;

namespace WindowsFormsApp1
{
    [PermissionSet(SecurityAction.Demand, Name = "FullTrust")]
    [System.Runtime.InteropServices.ComVisibleAttribute(true)]

    public partial class Form1 : Form
    {
        bool rs232Key, receiveKey;
        string orderID, userID;
        public SerialPort serialPort = new SerialPort();
        public delegate void fuck();
        private Thread demoThread;

        public Form1()
        {
            InitializeComponent();
            /* Registry.SetValue(@"HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet Explorer\MAIN\
 FeatureControl\FEATURE_BROWSER_EMULATION",
               "Browser.exe", "dword 11000");
             Registry.SetValue(@"HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet Explorer\MAIN\
 FeatureControl\FEATURE_BROWSER_EMULATION",
               "Browser.vshost.exe", "dword 11000");*/

        }

        private void Form1_Load(object sender, EventArgs e)
        {
            // button 設定
            //this.btnOpen.Text = "Open COM";
            //this.btnSend.Text = "Send";

            //this.btnSend.Enabled = false;

            // 事件初始化
            //this.btnOpen.Click += new EventHandler(Rs232PortDoor);
            //this.btnSend.Click += new EventHandler(Send);
            webBrowser1.ObjectForScripting = this;

            // rs232 door key
            rs232Key = true;
            

        }

        // OpenCOM 事件處理
        // 初始PORT & 打開 Send
        private void Rs232PortDoor(/*object sender, EventArgs e*/)
        {
            if (rs232Key)
            {
                //this.btnOpen.Text = "Close Port";

                // 打開 button2
                //this.btnSend.Enabled = true;

                // 設定使用的 PORT
                this.serialPort.PortName = "COM1";

                // 檢查 PORT 是否關閉
                if (!serialPort.IsOpen)
                    this.serialPort.Close();

                // 初始化 PORT
                this.serialPort.BaudRate = 115200;            // baud rate = 115200
                this.serialPort.Parity = Parity.None;       // Parity = none
                this.serialPort.StopBits = StopBits.One;    // stop bits = one
                this.serialPort.DataBits = 8;               // data bits = 8

                // 設定 PORT 接收事件 
                serialPort.DataReceived += new SerialDataReceivedEventHandler(SerialPort_DataReceived);


                try
                {
                    // 打開 PORT
                    serialPort.Open();
                }
                catch (Exception ex)
                {
                    //Console.WriteLine("Open() error: " + ex.Message);
                }


                // 清空 serial port 的緩存
                serialPort.DiscardInBuffer();       // RX
                serialPort.DiscardOutBuffer();      // TX

                rs232Key = false;
            }
            else
            {
                //this.btnOpen.Text = "Open Port";

                // 清空 serial port 的緩存
                serialPort.DiscardInBuffer();       // RX
                serialPort.DiscardOutBuffer();      // TX

                // 關閉 PORT
                this.serialPort.Close();

                // 關閉 button2
                //this.btnSend.Enabled = false;

                rs232Key = true;
            }
        }
        
        // PORT 接收事件
        private void SerialPort_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            Byte[] buffer = new Byte[1024];
            Int32 length = (sender as SerialPort).Read(buffer, 0, buffer.Length);
            //Console.WriteLine("********");
            /* string str = System.Text.Encoding.Default.GetString(buffer);
            Console.WriteLine(str);*/

            if (buffer[0] != 0x06 && buffer[0] != 0x15 && buffer[0] != null && receiveKey==true)
            {
                // Console.WriteLine("yes");
                // fuck ff = new fuck(InvokeTestMethod);
                // this.BeginInvoke(ff);
                // InvokeTestMethod();
                postJSON();

                //this.demoThread = new Thread(new ThreadStart(this.ThreadProcSafe));

                //this.demoThread.Start();
                receiveKey = false;
            }
        }

        // Send 事件處理
        private void Send(string aram)
        {
            string money_after = "<TM><TRANS><T0100>0100</T0100><T0300>811599</T0300><T0400>";
            string money = aram;
            string time_after = "</T0400><T1101>001003</T1101><T1201> ";
            string time = DateTime.Now.ToString("HHmmss");
            string date_after = "</T1201><T1301>";
            string date = DateTime.Now.ToString("yyyyMMdd");
            string final_after = "</T1301><T3701>POS_TXN_NUM_011</T3701><T5504>TM</T5504><T5510>1234</T5510></TRANS></TM>";
            string str = money_after + money + time_after + time + date_after + date + final_after;
            receiveKey = true;
            rs232Output(str.ToCharArray());
        }

        // 經由RS232 字串傳送
        private void rs232Output(char[] meg)
        {
            serialPort.Write(new byte[] { 0x02 }, 0, 1);
            for (int i = 0; i < meg.Length; i++)
            {
                serialPort.Write(meg, i, 1);
            }
            serialPort.Write(new byte[] { 0x03 }, 0, 1);
            //Console.WriteLine(meg);
        }

        private void btnSend_Click(object sender, EventArgs e)
        {

        }

        private void webBrowser1_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
        {

        }

        public void Ecard(string easyCardMoney, string origin_userID, string origin_orderID)
        {
            this.Rs232PortDoor();
            this.Send(easyCardMoney);
            //fetch 'https://us-central1-cafe-le-cloud.cloudfunctions.net/check'
            // this.Rs232PortDoor();
            orderID = origin_orderID;
            userID = origin_userID;
            MessageBox.Show(easyCardMoney);
        }

        

        private void postJSON()
        {
            //dynamic pc = new JObject();
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://us-central1-cafe-le-cloud.cloudfunctions.net/check?auth=AIzaSyAq8Xt1gbv-1CjYPYtTVsKAdUEcxlvujwI");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";
            //httpWebRequest.Credentials = "key=AIzaSyAq8Xt1gbv-1CjYPYtTVsKAdUEcxlvujwI";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                //string json = "method:\"POST\",headers:{Accept:\"application/json\",Content-Type:\"application/json\",},body:\"{\"orderId\":\"" + orderID + "\",\"createdBy\":\"" + userID + "\"}\"";

                string json = "{\"orderId\":\"" + orderID + "\",\"createdBy\":\"" + userID + "\"}";
                Console.WriteLine(json);

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
            }
        }

        /*private void InvokeTestMethod()
        {
            Console.WriteLine(webBrowser1.Document.GetType());

            if (webBrowser1.Document != null)
            {
                Object[] objArray = new Object[2];
                objArray[0] = (Object)orderID;
                objArray[1] = (Object)userID;
                webBrowser1.Document.InvokeScript("handleChecked", objArray);
            }
        }*/

        /*private void InvokeTestMethod()
        {
            if (this.InvokeRequired)
            {
                this.Invoke(new MethodInvoker(InvokeTestMethod)); //delgete型態，傳Method Name
                Console.WriteLine("11");
            }
            else
            {
                Object[] objArray = new Object[2];
                objArray[0] = (Object)orderID;
                objArray[1] = (Object)userID;
                webBrowser1.Document.InvokeScript("handleChecked", objArray);
                Console.WriteLine("69");
                Console.WriteLine(objArray[0]);
                Console.WriteLine(objArray[1]);
            }
        }

        private void ThreadProcSafe()
        {
            this.InvokeTestMethod();
        }*/
    }
}
