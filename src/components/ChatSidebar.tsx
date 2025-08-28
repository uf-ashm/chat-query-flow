import { useState } from "react";
import { Upload, FileSpreadsheet, X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ChatSidebar() {
  const { state } = useSidebar();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const isCollapsed = state === "collapsed";

  const handleFileSelect = (file: File) => {
    if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
        file.type === "application/vnd.ms-excel" ||
        file.name.endsWith('.xlsx') || 
        file.name.endsWith('.xls')) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <Sidebar className="border-r bg-gradient-subtle" collapsible="icon">
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-muted-foreground mb-4">
            {!isCollapsed && "Excel Upload"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Card 
                  className={`transition-all duration-200 ${
                    isDragOver 
                      ? "border-upload-border bg-upload-background shadow-custom-md" 
                      : "border-dashed border-2 border-muted hover:border-upload-border hover:bg-upload-background/50"
                  } ${isCollapsed ? "p-2" : "p-6"}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <div className="text-center">
                    {isCollapsed ? (
                      <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                    ) : (
                      <>
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-sm font-medium mb-2">Upload Excel File</p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Drag & drop or click to select .xlsx/.xls files
                        </p>
                        <input
                          type="file"
                          accept=".xlsx,.xls"
                          onChange={handleFileInputChange}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload">
                          <Button variant="outline" size="sm" className="cursor-pointer">
                            Choose File
                          </Button>
                        </label>
                      </>
                    )}
                  </div>
                </Card>
              </SidebarMenuItem>

              {selectedFile && (
                <SidebarMenuItem className="mt-4">
                  <Card className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 min-w-0">
                        <FileSpreadsheet className="h-5 w-5 text-primary flex-shrink-0" />
                        {!isCollapsed && (
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="h-8 w-8 p-0 flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}