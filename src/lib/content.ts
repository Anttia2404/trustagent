import type { LucideIcon } from 'lucide-react';
import { BookOpenCheck, Calculator, FileText, BriefcaseBusiness, ShieldCheck, Fingerprint, ScanEye, FileSearch, Database, Layers3, Workflow } from 'lucide-react';

export type AgentStatus = 'IMPLEMENTED' | 'ROADMAP';

export interface LegalAgent {
  domain: 'traffic' | 'labor' | 'tax';
  collection: string;
  name: string;
  specialty: string;
  status: AgentStatus;
  icon: LucideIcon;
  capabilities: string[];
  accent: 'green' | 'blue' | 'amber' | 'violet' | 'neutral';
}

export const agents: LegalAgent[] = [
  {
    domain: 'traffic', collection: 'legal_traffic',
    name: 'Agent giao thông', specialty: 'Quy định và xử phạt giao thông tại Việt Nam', status: 'IMPLEMENTED', icon: BookOpenCheck, accent: 'green',
    capabilities: ['Hỏi đáp pháp luật', 'Truy xuất kết hợp', 'Kiểm tra trích dẫn'],
  },
  {
    domain: 'labor', collection: 'legal_labor',
    name: 'Agent lao động', specialty: 'Pháp luật lao động và quy định nơi làm việc tại Việt Nam', status: 'IMPLEMENTED', icon: BriefcaseBusiness, accent: 'blue',
    capabilities: ['Hỏi đáp pháp luật', 'Truy xuất kết hợp', 'Kiểm tra trích dẫn'],
  },
  {
    domain: 'tax', collection: 'legal_accounting',
    name: 'Agent thuế', specialty: 'Quy định thuế và hoá đơn tại Việt Nam', status: 'IMPLEMENTED', icon: Calculator, accent: 'amber',
    capabilities: ['Tra cứu luật thuế', 'Tham chiếu nguồn', 'Kiểm tra trích dẫn'],
  },
];

export const registryTabs = [
  {
    id: 'identity', label: 'Sổ danh tính', subtitle: 'Danh tính & năng lực', icon: Fingerprint, tag: 'Danh tính ERC-8004',
    title: 'Sẵn sàng được tìm thấy.',
    body: 'Mỗi Agent tham gia có thể công bố danh tính trên chuỗi, năng lực và địa chỉ dịch vụ để các Agent khác tìm thấy.',
    fields: [
      ['Agent', 'Agent giao thông'],
      ['Trạng thái đăng ký', 'Chưa đăng ký'],
      ['Mã Agent', 'Chưa được cấp'],
      ['Năng lực', 'Luật giao thông Việt Nam · trả lời có trích dẫn'],
      ['Địa chỉ dịch vụ', 'Chưa kết nối'],
    ],
  },
  {
    id: 'reputation', label: 'Sổ uy tín', subtitle: 'Phản hồi & đánh giá', icon: ScanEye, tag: 'Phản hồi ERC-8004',
    title: 'Tín hiệu để tham khảo.',
    body: 'Người dùng và các Agent khác có thể phản hồi về dịch vụ. Uy tín giúp so sánh nhà cung cấp, nhưng không chứng minh tính chính xác pháp lý.',
    fields: [
      ['Chất lượng trả lời', 'Chờ phản hồi được xác minh'],
      ['Độ chính xác trích dẫn', 'Chưa có điểm thực tế'],
      ['Yêu cầu thành công', 'Chưa kết nối'],
      ['Phản hồi người dùng', 'Chưa có phản hồi'],
    ],
  },
  {
    id: 'validation', label: 'Sổ xác thực', subtitle: 'Kiểm chứng độc lập', icon: ShieldCheck, tag: 'Xác thực ERC-8004',
    title: 'Đánh giá độc lập.',
    body: 'Bên xác thực có thể đối chiếu kết quả của Agent với bằng chứng và gửi đánh giá độc lập với phản hồi thông thường của người dùng.',
    fields: [
      ['Yêu cầu xác thực', 'Chưa gửi'],
      ['Tham chiếu bằng chứng', 'Chưa kết nối'],
      ['Kết quả xác thực', 'Chờ đánh giá độc lập'],
      ['Ảnh hưởng đến uy tín', 'Chưa ghi nhận'],
    ],
  },
] as const;

export const evidenceSteps = [
  { icon: FileText, title: 'Câu hỏi pháp lý', detail: 'Yêu cầu API giao thông' },
  { icon: Database, title: 'Câu trả lời RAG', detail: 'Bằng chứng pháp lý đã truy xuất' },
  { icon: FileSearch, title: 'Trích dẫn', detail: 'Văn bản và điều khoản' },
  { icon: Fingerprint, title: 'Biên nhận', detail: 'Luồng trả phí · khi bật' },
  { icon: Layers3, title: 'Lô Merkle', detail: 'Chuẩn bị riêng' },
  { icon: Workflow, title: 'Neo trên chuỗi', detail: 'Chưa tự động hoá' },
  { icon: ShieldCheck, title: 'Kiểm tra toàn vẹn', detail: 'API kiểm chứng biên nhận' },
] as const;

export const paymentSteps = [
  'Agent bên ngoài',
  'Yêu cầu API',
  'HTTP 402 Yêu cầu thanh toán',
  'Uỷ quyền thanh toán',
  'Xác minh và quyết toán',
  'Agent pháp lý chạy RAG',
  'Trả lời + trích dẫn + biên nhận',
] as const;
