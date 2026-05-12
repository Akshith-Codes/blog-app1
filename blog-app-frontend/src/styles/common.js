// ─── Layout ───────────────────────────────────────────
export const pageBackground = "bg-[#0f0e0c] min-h-screen";
export const pageWrapper = "max-w-5xl mx-auto px-6 py-16";
export const section = "mb-14";
 
// ─── Cards ────────────────────────────────────────────
export const cardClass =
  "bg-[#1a1814] border border-[#2e2b25] rounded-xl p-6 hover:border-[#c9a84c]/40 transition duration-300 cursor-pointer";
 
// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "text-5xl font-bold text-[#e8dfc8] tracking-tight leading-none mb-2";
export const headingClass = "text-2xl font-bold text-[#e8dfc8] tracking-tight";
export const subHeadingClass = "text-lg font-semibold text-[#e8dfc8] tracking-tight";
export const bodyText = "text-[#7a7060] leading-relaxed";
export const mutedText = "text-sm text-[#5a5448]";
export const linkClass = "text-[#c9a84c] hover:text-[#e8c96a] transition";
 
// ─── Buttons ──────────────────────────────────────────
export const primaryBtn =
  "bg-[#c9a84c] text-[#0f0e0c] font-semibold px-5 py-2 rounded-lg hover:bg-[#e8c96a] transition cursor-pointer text-sm";
export const secondaryBtn =
  "border border-[#2e2b25] text-[#a89070] font-medium px-5 py-2 rounded-lg hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition cursor-pointer text-sm";
export const ghostBtn =
  "text-[#c9a84c] hover:text-[#e8c96a] transition cursor-pointer text-sm font-medium";
 
// ─── Forms ────────────────────────────────────────────
export const formCard =
  "bg-[#1a1814] border border-[#2e2b25] rounded-2xl p-10 max-w-4xl mx-auto";
export const formTitle =
  "text-2xl font-bold text-[#e8dfc8] tracking-tight text-center mb-7";
export const labelClass =
  "text-xs font-medium text-[#7a7060] uppercase tracking-widest mb-2 block";
export const inputClass =
  "w-full bg-[#0f0e0c] border border-[#2e2b25] rounded-lg px-4 py-3 text-[#e8dfc8] text-sm placeholder:text-[#5a5448] focus:outline-none focus:border-[#c9a84c]/60 transition";
export const formGroup = "mb-5";
export const submitBtn =
  "w-full bg-[#c9a84c] text-[#0f0e0c] font-semibold py-3 rounded-lg hover:bg-[#e8c96a] transition cursor-pointer mt-2 text-sm";
 
// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "bg-[#1a1814] border-b border-[#2e2b25] px-8 h-[56px] flex items-center sticky top-0 z-50";
export const navContainerClass = "max-w-6xl mx-auto w-full flex items-center justify-between";
export const navBrandClass = "text-base font-bold text-[#c9a84c] tracking-widest uppercase";
export const navLinksClass = "flex items-center gap-6";
export const navLinkClass =
  "text-xs text-[#7a7060] hover:text-[#c9a84c] transition uppercase tracking-wider";
export const navLinkActiveClass =
  "text-xs text-[#c9a84c] border-b border-[#c9a84c] pb-0.5 uppercase tracking-wider";
 
// ─── Article / Blog ───────────────────────────────────
export const articleGrid = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5";
export const articleCardClass =
  "bg-[#1a1814] border border-[#2e2b25] rounded-xl p-5 hover:border-[#c9a84c]/40 transition duration-300 flex flex-col gap-2 cursor-pointer group";
export const articleTitle =
  "text-base font-semibold text-[#e8dfc8] leading-snug group-hover:text-[#c9a84c] transition";
export const articleExcerpt = "text-sm text-[#7a7060] leading-relaxed";
export const articleMeta = "text-xs text-[#c9a84c] uppercase tracking-wider";
export const articleBody = "text-[#c2b89a] leading-[1.85] text-[0.95rem] max-w-2xl";
export const timestampClass = "text-xs text-[#5a5448] flex items-center gap-1.5";
export const tagClass =
  "text-[0.65rem] font-semibold text-[#c9a84c] uppercase tracking-widest w-fit";
 
// ─── Article Page ─────────────────────────────────────
export const articlePageWrapper = "max-w-3xl mx-auto px-6 py-14";
export const articleHeader = "mb-10 flex flex-col gap-4";
export const articleCategory =
  "text-xs font-semibold uppercase tracking-widest text-[#c9a84c]";
export const articleMainTitle =
  "text-4xl font-bold text-[#e8dfc8] leading-tight tracking-tight uppercase";
export const articleAuthorRow =
  "flex items-center justify-between border-t border-b border-[#2e2b25] py-3 text-sm text-[#7a7060]";
export const authorInfo = "flex items-center gap-2 font-medium text-[#a89070]";
export const articleContent =
  "text-[#c2b89a] leading-[1.9] text-[1rem] whitespace-pre-line mt-8";
export const articleFooter =
  "border-t border-[#2e2b25] mt-12 pt-6 text-xs text-[#5a5448]";
 
// ─── Article Actions ──────────────────────────────────
export const articleActions = "flex gap-3 mt-6";
export const editBtn =
  "border border-[#c9a84c]/40 text-[#c9a84c] text-sm px-5 py-2 rounded-lg hover:bg-[#c9a84c]/10 transition";
export const deleteBtn =
  "border border-[#8b3a3a]/40 text-[#c95f5f] text-sm px-5 py-2 rounded-lg hover:bg-[#8b3a3a]/20 transition";
 
// ─── Article Status Badge ─────────────────────────────
export const articleStatusActive =
  "absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#1d4a2a] text-[#4ade80] border border-[#2d6b3f]/50 uppercase tracking-wider";
export const articleStatusDeleted =
  "absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#4a1d1d] text-[#f87171] border border-[#6b2d2d]/50 uppercase tracking-wider";
 
// ─── Feedback ─────────────────────────────────────────
export const errorClass = "text-[#c95f5f] text-sm text-center py-10";
export const successClass = "text-[#4ade80] text-sm text-center py-10";
export const loadingClass = "text-[#7a7060] text-sm animate-pulse text-center py-10";
export const emptyStateClass = "text-center text-[#5a5448] py-16 text-sm";
 
// ─── Comments ────────────────────────────────────────
export const commentsWrapper = "mt-12 flex flex-col gap-4";
export const commentCard =
  "bg-[#1a1814] border border-[#2e2b25] rounded-xl p-4 transition hover:border-[#c9a84c]/20";
export const commentHeader = "flex items-center justify-between mb-2";
export const commentUser = "text-sm font-medium text-[#e8dfc8]";
export const commentTime = "text-xs text-[#5a5448]";
export const commentText = "text-[#a89070] text-sm leading-relaxed mt-1";
export const avatar =
  "w-8 h-8 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/40 text-[#c9a84c] flex items-center justify-center text-sm font-semibold";
export const commentUserRow = "flex items-center gap-3";
 
// ─── Divider ─────────────────────────────────────────
export const divider = "border-t border-[#2e2b25] my-10";
